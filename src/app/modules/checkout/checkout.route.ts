import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/',
  validateRequest(AddToCardValidations.createAddToCartValidationSchema),
  AddToCartControllers.createAddToCart,
)

export const CheckoutRoutes = router
