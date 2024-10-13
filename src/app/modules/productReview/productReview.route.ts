import express from 'express'
import { ProductReviewControllers } from './productReview.controller'

const router = express.Router()

router.post('/', ProductReviewControllers.createProductReview)

router.get('/', ProductReviewControllers.getAllProductReviews)

router.patch('/status', ProductReviewControllers.updateProductReviewStatus)

export const ProductReviewRoutes = router
