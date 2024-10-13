import QueryBuilder from '../../builder/QueryBuilder'
import { ReviewProductSearchableField } from './productReview.constant'
import { TProductReview } from './productReview.interface'
import { ProductReview } from './productReview.model'

const createProductReviewIntoDB = async (payload: TProductReview) => {
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

export const ProductReviewServices = {
  createProductReviewIntoDB,
  getAllProductReviewsFromDB,
  updateProductReviewStatusIntoDB,
  deleteProductReviewFromDB,
}
