import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'
import config from '../../config'
import { TResetPasswordResult } from './auth.interface'

const signUp = catchAsync(async (req, res) => {
  const result = await AuthServices.signUp(req.body)
  //   send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const { accessToken, user, refreshToken } = await AuthServices.login(
    req?.body,
  )
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  //   send response
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfuly',
    accessToken,
    data: user,
  })
})

const getUserByUserId = catchAsync(async (req, res) => {
  const userId = req.user!._id // Assuming req.user contains the authenticated user's data
  const result = await AuthServices.getUserByUserIdFromDB(userId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrived successfully!',
    data: result,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access Token Is retrived succesfully',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req, res) => {
  const email = req.body.email

  const result = await AuthServices.forgetPassword(email)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `We've sent you an email with a link to update your password.`,
    data: result,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization

  // Reset password and generate new tokens
  const { accessToken, refreshToken, user } = (await AuthServices.resetPassword(
    req.body,
    token!,
  )) as TResetPasswordResult

  // console.log(accessToken, refreshToken, user)

  // Set the new refreshToken as a secure, HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Reset Successfully',
    data: { accessToken, user },
  })
})

export const AuthControllers = {
  signUp,
  login,
  getUserByUserId,
  refreshToken,
  forgetPassword,
  resetPassword,
}
