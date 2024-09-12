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

router.delete('/:productId', WishlistControllers.removeWishlist)

export const WishlistRoutes = router
