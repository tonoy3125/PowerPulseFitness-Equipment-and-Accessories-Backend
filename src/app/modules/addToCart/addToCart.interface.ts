import { Types } from 'mongoose'

export type TAddToCart = {
  productId: Types.ObjectId
  userId: Types.ObjectId
  quantity: number
  subTotal: number
  orderNote: string
  isDeleted: boolean
}
