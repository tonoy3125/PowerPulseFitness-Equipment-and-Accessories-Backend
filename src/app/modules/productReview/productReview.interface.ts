import { Types } from 'mongoose'

export type TProductReview = {
  productId: Types.ObjectId
  userId: Types.ObjectId
  name: string
  email: string
  rating: 1 | 2 | 3 | 4 | 5
  review: string
  status?: 'Pending' | 'Accepted' | 'Rejected'
  isDeleted: boolean
}
