import express from 'express'

import { AddToCardValidations } from './addToCart.validation'
import { AddToCartControllers } from './addToCart.controller'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(AddToCardValidations.createAddToCartValidationSchema),
  AddToCartControllers.createAddToCart,
)

export const AddToCartRoutes = router
