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

router.get(
  '/user-cart',
  auth('admin', 'user'),
  AddToCartControllers.getUserCartItems,
)

// Route to increase quantity
router.patch(
  '/increase-quantity',
  auth('admin', 'user'),
  validateRequest(AddToCardValidations.updateCartItemValidationSchema),
  AddToCartControllers.increaseQuantity,
)

// Route to decrease quantity
router.patch(
  '/decrease-quantity',
  auth('admin', 'user'),
  validateRequest(AddToCardValidations.updateCartItemValidationSchema),
  AddToCartControllers.decreaseQuantity,
)

router.delete(
  '/remove',
  auth('admin', 'user'),
  AddToCartControllers.removeCartItem,
)

export const AddToCartRoutes = router
