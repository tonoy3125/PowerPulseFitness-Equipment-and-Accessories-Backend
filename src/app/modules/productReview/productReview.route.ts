import express from 'express'
import { ProductReviewControllers } from './productReview.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', ProductReviewControllers.createProductReview)

router.get('/', auth('admin'), ProductReviewControllers.getAllProductReviews)

router.get('/accepted', ProductReviewControllers.getAcceptedProductReviews)

router.patch(
  '/status',
  auth('admin'),
  ProductReviewControllers.updateProductReviewStatus,
)

router.delete(
  '/:id',
  auth('admin'),
  ProductReviewControllers.deleteProductReview,
)

export const ProductReviewRoutes = router
