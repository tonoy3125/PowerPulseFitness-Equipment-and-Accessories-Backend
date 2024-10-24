import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { TChangePassword, TLoginUser, TResetPassword } from './auth.interface'
import bcrypt from 'bcrypt'

import createToken, { verifyToken } from './auth.utils'
import config from '../../config'
import { sendEmail } from '../../utils/sendEmail'

const signUp = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}

const login = async (payload: TLoginUser) => {
  // check if the user is exits
  const user = await User.isUserExistsByEmail(payload.email)
  // console.log(user)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists')
  }

  // const isPasswordMatch = await User.isPasswordMatch(
  //   payload.password,
  //   user.password,
  // )
  // console.log(isPasswordMatch)

  // console.log(payload.password)

  if (!(await User.isPasswordMatch(payload.password, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password Does Not Match')
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    fullName: user.fullName,
  }
  // console.log(jwtPayload)

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  // Refresh Token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
    user,
  }
}

const changePassword = async (userId: string, payload: TChangePassword) => {
  // Find the user by ID
  const user = await User.findById(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // Verify if the old password matches
  if (!(await User.isPasswordMatch(payload.oldPassword, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Current password is incorrect')
  }

  // Check if the new password matches the confirmation password
  if (payload?.newPassword !== payload?.confirmNewPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'New passwords and Confirm New Password do not match',
    )
  }

  // Check if the new password is the same as the old password
  if (await User.isPasswordMatch(payload.newPassword, user.password)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'New password must be different from the current password',
    )
  }

  // Hash the new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  // Update the user's password
  await User.findOneAndUpdate({
    password: newHashedPassword,
  })
  // Generate new tokens after password change (optional)
  const jwtPayload = {
    email: user.email,
    role: user.role,
    fullName: user.fullName,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    user,
    accessToken,
  }
}

const getUserByUserIdFromDB = async (userId: string) => {
  const result = await User.findOne({ _id: userId })
  return result
}

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)
  // console.log(decoded)
  const { email } = decoded
  // check if the user is exits
  const user = await User.isUserExistsByEmail(email)
  // console.log(user)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists')
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    fullName: user.fullName,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  return {
    accessToken,
  }
}

const forgetPassword = async (email: string) => {
  // check if the user is exits
  const user = await User.isUserExistsByEmail(email)
  // console.log(user)

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No account found with that email.',
    )
  }

  // Token

  const jwtPayload = {
    email: user.email,
    role: user.role,
    fullName: user.fullName,
  }

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  )

  const resetUiLink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`
  await sendEmail(user.email, resetUiLink)
  console.log(resetUiLink)
}

const resetPassword = async (payload: TResetPassword, token: string) => {
  try {
    // Verify the token, throws an error if expired or invalid
    const decoded = verifyToken(token, config.jwt_access_secret as string)

    if (payload.newPassword !== payload.confirmNewPassword) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Passwords do not match')
    }

    // Hash the new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds),
    )

    // Find the user and update the password
    const user = await User.findOneAndUpdate(
      {
        email: decoded.email,
        role: decoded.role,
      },
      {
        password: newHashedPassword,
      },
      {
        new: true,
      },
    )

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exist')
    }

    const jwtPayload = {
      email: user?.email,
      role: user?.role,
      fullName: user.fullName,
    }

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    )

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    )

    return {
      user,
      accessToken,
      refreshToken,
    }
  } catch (error) {
    if (error instanceof AppError && error.message === 'Token has expired') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'The reset link you provided has expired. Please request a new link to reset your password',
      )
    }
    throw error
  }
}

export const AuthServices = {
  signUp,
  login,
  changePassword,
  getUserByUserIdFromDB,
  refreshToken,
  forgetPassword,
  resetPassword,
}
