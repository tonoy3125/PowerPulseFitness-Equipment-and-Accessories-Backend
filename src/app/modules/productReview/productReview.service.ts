/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder'
import { ReviewProductSearchableField } from './productReview.constant'
import { TProductReview } from './productReview.interface'
import { ProductReview } from './productReview.model'

const createProductReviewIntoDB = async (payload: TProductReview) => {
  const { userId, productId } = payload

  // Check if there's a pending review
  const existingPendingReview = await ProductReview.findOne({
    userId,
    productId,
    status: 'Pending',
  })

  // If there's an existing pending review, delete it
  if (existingPendingReview) {
    await ProductReview.findOneAndDelete({
      _id: existingPendingReview._id,
    })
  }

  // Proceed with creating the new review
  const result = await ProductReview.create(payload)
  return result
}

const getAllProductReviewsFromDB = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(
    ProductReview.find().populate('productId').populate('userId'),
    query,
  )
    .search(ReviewProductSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await reviewQuery.countTotal()
  const result = await reviewQuery.modelQuery
  return { meta, result }
}

const getProductAcceptedReviewsFromDB = async (productId: string) => {
  const filter: any = { status: 'Accepted' }

  // If productId is provided, include it in the filter
  if (productId) {
    filter.productId = productId
  }

  const result = await ProductReview.find(filter)
  return result
}

const getPendingProductReviewsFromDB = async (
  productId: string,
  userId: string,
) => {
  const result = await ProductReview.find({
    productId,
    userId,
    status: 'Pending',
  })
  return result
}

const updateProductReviewStatusIntoDB = async (
  reviewId: string,
  status: 'Pending' | 'Accepted' | 'Rejected',
) => {
  const result = await ProductReview.findByIdAndUpdate(
    reviewId,
    { status },
    { new: true },
  )
  return result
}

const deleteProductReviewFromDB = async (id: string) => {
  const result = await ProductReview.findByIdAndDelete(id)
  return result
}

const deletePendingReviewFromDB = async (userId: string, productId: string) => {
  const result = await ProductReview.findOneAndDelete({
    userId: userId,
    productId: productId,
    status: 'Pending',
  })
  return result
}

export const ProductReviewServices = {
  createProductReviewIntoDB,
  getAllProductReviewsFromDB,
  getProductAcceptedReviewsFromDB,
  getPendingProductReviewsFromDB,
  updateProductReviewStatusIntoDB,
  deleteProductReviewFromDB,
  deletePendingReviewFromDB,
}
