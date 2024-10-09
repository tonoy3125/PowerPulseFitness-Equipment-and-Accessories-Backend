import express from 'express'
import { ProductReviewControllers } from './productReview.controller'

const router = express.Router()

router.post('/', ProductReviewControllers.createProductReview)

export const ProductReviewRoutes = router
