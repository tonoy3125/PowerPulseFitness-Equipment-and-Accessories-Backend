import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductReviewServices } from './productReview.service'

const createProductReview = catchAsync(async (req, res) => {
  const result = await ProductReviewServices.createProductReviewIntoDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review Created Successfully',
    data: result,
  })
})
export const ProductReviewControllers = {
  createProductReview,
}
