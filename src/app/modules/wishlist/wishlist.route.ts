import express from 'express'
import { WishlistControllers } from './wishlist.controller'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post(
  '/:productId',
  auth('admin', 'user'),
  WishlistControllers.toggleWishlistItem,
)

router.get('/', auth('admin', 'user'), WishlistControllers.getUserWishlist)

router.delete(
  '/clear/all',
  auth('admin', 'user'),
  WishlistControllers.clearAllWishlist,
)

export const WishlistRoutes = router
