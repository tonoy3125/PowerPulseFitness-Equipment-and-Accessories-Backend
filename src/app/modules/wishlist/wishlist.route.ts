import express from 'express'
import { WishlistControllers } from './wishlist.controller'
import validateRequest from '../../middlewares/validateRequest'
import { WishlistValidations } from './wishlist.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
const router = express.Router()

router.post('/', auth('admin', 'user'), WishlistControllers.createWishlist)

router.get('/', WishlistControllers.getAllWishlist)

router.delete(
  '/:productId',
  auth('admin', 'user'),
  WishlistControllers.removeWishlist,
)

router.delete('/clear/all', WishlistControllers.clearAllWishlist)

export const WishlistRoutes = router
