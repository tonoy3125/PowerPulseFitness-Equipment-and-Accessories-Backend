import express from 'express'
import { WishlistControllers } from './wishlist.controller'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post('/', auth('admin', 'user'), WishlistControllers.createWishlist)

router.get('/', auth('admin', 'user'), WishlistControllers.getUserWishlist)

router.delete(
  '/:productId',
  auth('admin', 'user'),
  WishlistControllers.removeWishlist,
)

router.delete('/clear/all', WishlistControllers.clearAllWishlist)

export const WishlistRoutes = router
