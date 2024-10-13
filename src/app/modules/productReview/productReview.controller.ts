import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductReviewServices } from './productReview.service'

const createProductReview = catchAsync(async (req, res) => {
  const result = await ProductReviewServices.createProductReviewIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review Created Successfully',
    data: result,
  })
})

const getAllProductReviews = catchAsync(async (req, res) => {
  const result = await ProductReviewServices.getAllProductReviewsFromDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Reviews retrived successfully!',
    data: result,
  })
})

const updateProductReviewStatus = catchAsync(async (req, res) => {
  const { reviewId, status } = req.body // Pass reviewId and status in the request body
  const result = await ProductReviewServices.updateProductReviewStatusIntoDB(
    reviewId,
    status,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Review ${status} Successfully`,
    data: result,
  })
})

export const ProductReviewControllers = {
  createProductReview,
  getAllProductReviews,
  updateProductReviewStatus,
}
