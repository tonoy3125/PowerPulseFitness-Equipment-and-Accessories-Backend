import { TProductReview } from './productReview.interface'
import { ProductReview } from './productReview.model'

const createProductReviewIntoDB = async (payload: TProductReview) => {
  const result = await ProductReview.create(payload)
  return result
}

export const ProductReviewServices = {
  createProductReviewIntoDB,
}
