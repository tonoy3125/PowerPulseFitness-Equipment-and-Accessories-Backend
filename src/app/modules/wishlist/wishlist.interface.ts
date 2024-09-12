import { Types } from 'mongoose'

export type TWishlist = {
  productId: Types.ObjectId
  userId: Types.ObjectId
  isDeleted: boolean
}
