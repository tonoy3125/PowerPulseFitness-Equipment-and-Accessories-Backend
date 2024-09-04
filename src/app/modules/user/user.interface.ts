import { USER_ROLE } from './user.constant'

export type TUserRoles = keyof typeof USER_ROLE

export type TUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: TUserRoles
}
