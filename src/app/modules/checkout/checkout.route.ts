import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CheckoutValidations } from './checkout.validation'
import { CheckoutControllers } from './checkout.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/',
  validateRequest(CheckoutValidations.createCheckoutValidationSchema),
  CheckoutControllers.createCheckOut,
)

export const CheckoutRoutes = router
