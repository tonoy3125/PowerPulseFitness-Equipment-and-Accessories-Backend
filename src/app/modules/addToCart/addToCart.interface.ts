import { Types } from 'mongoose'

export type TCartItem = {
  productId: Types.ObjectId
  quantity: number
  subTotal: number
  isDeleted: boolean
}

export type TAddToCart = {
  userId: Types.ObjectId
  items: TCartItem[] // Add the items array
  isDeleted: boolean
}
