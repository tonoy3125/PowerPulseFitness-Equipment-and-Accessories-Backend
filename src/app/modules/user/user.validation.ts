import { z } from 'zod'
import { USER_ROLE } from './user.constant'

const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First Name is required' }),
    lastName: z.string({ required_error: 'Last Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' }),
    role: z.nativeEnum(USER_ROLE).optional(),
  }),
})

export const UserValidations = {
  createUserValidationSchema,
}
