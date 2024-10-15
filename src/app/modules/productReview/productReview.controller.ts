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
  const result = await ProductReviewServices.getAllProductReviewsFromDB(
    req?.query,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products retrieved Successfully!',
    meta: result.meta,
    data: result.result,
  })
})

const getAcceptedProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.query

  if (!productId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Product ID is required',
    })
  }

  const result = await ProductReviewServices.getProductAcceptedReviewsFromDB(
    productId as string,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Accepted reviews retrieved successfully!',
    data: result,
  })
})

const getPendingProductReviews = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { productId } = req.query

  if (!productId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Product ID is required',
    })
  }

  const result = await ProductReviewServices.getPendingProductReviewsFromDB(
    productId as string,
    userId.toString(),
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Pending reviews retrieved successfully!',
    data: result,
  })
})

const updateProductReviewStatus = catchAsync(async (req, res) => {
  const { reviewId, status } = req.body
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

const deleteProductReview = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductReviewServices.deleteProductReviewFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review Deleted successfully!',
    data: result,
  })
})

const deletePendingReview = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { productId } = req.query

  if (!productId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Product ID is required',
    })
  }

  const result = await ProductReviewServices.deletePendingReviewFromDB(
    userId.toString(),
    productId as string,
  )

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Pending review not found',
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Pending review deleted successfully!',
    data: result,
  })
})

export const ProductReviewControllers = {
  createProductReview,
  getAllProductReviews,
  getAcceptedProductReviews,
  getPendingProductReviews,
  updateProductReviewStatus,
  deleteProductReview,
  deletePendingReview,
}
