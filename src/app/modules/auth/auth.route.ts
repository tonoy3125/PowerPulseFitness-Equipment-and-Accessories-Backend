import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidations } from '../user/user.validation'
import { AuthControllers } from './auth.controller'
import { AuthValidations } from './auth.validation'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.signUp,
)

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login,
)

router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
)

router.get('/user', auth('admin', 'user'), AuthControllers.getUserByUserId)

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
)

router.post(
  '/forget-password',
  validateRequest(AuthValidations.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
)

router.post(
  '/reset-password',
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
)

export const AuthRoutes = router
