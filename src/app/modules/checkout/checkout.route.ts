import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CheckoutValidations } from './checkout.validation'
import { CheckoutControllers } from './checkout.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(CheckoutValidations.createCheckoutValidationSchema),
  CheckoutControllers.createCheckOut,
)

router.get('/:id', CheckoutControllers.getSingleCheckoutByOrderId)

export const CheckoutRoutes = router
