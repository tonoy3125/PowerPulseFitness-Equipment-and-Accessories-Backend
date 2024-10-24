import express from 'express'
import { ProductReviewControllers } from './productReview.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', ProductReviewControllers.createProductReview)

router.get('/', auth('admin'), ProductReviewControllers.getAllProductReviews)

router.get('/accepted', ProductReviewControllers.getAcceptedProductReviews)

router.get(
  '/pending',
  auth('admin', 'user'),
  ProductReviewControllers.getPendingProductReviews,
)

router.patch(
  '/status',
  auth('admin'),
  ProductReviewControllers.updateProductReviewStatus,
)

router.delete(
  '/pending',
  auth('user', 'admin'),
  ProductReviewControllers.deletePendingReview,
)

router.delete(
  '/:id',
  auth('admin'),
  ProductReviewControllers.deleteProductReview,
)

// router.delete(
//   '/pending',
//   auth('user', 'admin'),
//   ProductReviewControllers.deletePendingReview,
// )

export const ProductReviewRoutes = router
