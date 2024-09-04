import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUserRoles = keyof typeof USER_ROLE

export type TUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: TUserRoles
  fullName?: string
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
