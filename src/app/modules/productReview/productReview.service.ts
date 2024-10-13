import { TProductReview } from './productReview.interface'
import { ProductReview } from './productReview.model'

const createProductReviewIntoDB = async (payload: TProductReview) => {
  const result = await ProductReview.create(payload)
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

export const ProductReviewServices = {
  createProductReviewIntoDB,
  updateProductReviewStatusIntoDB,
}
