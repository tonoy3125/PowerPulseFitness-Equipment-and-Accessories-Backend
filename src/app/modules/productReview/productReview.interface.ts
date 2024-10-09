import { Types } from 'mongoose'

export type TProductReview = {
  productId: Types.ObjectId
  userId: Types.ObjectId
  rating: 1 | 2 | 3 | 4 | 5
  review: string
  isDeleted: boolean
}
