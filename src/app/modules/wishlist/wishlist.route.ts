import express from 'express'
import { WishlistControllers } from './wishlist.controller'
import validateRequest from '../../middlewares/validateRequest'
import { WishlistValidations } from './wishlist.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(WishlistValidations.createWishlistValidationSchema),
  WishlistControllers.createWishlist,
)

export const WishlistRoutes = router
