import { Types } from 'mongoose'

export type TCheckout = {
  addToCartProduct: { productId: Types.ObjectId; quantity: number }[]
  userId: Types.ObjectId
  firstName: string
  lastName: string
  companyName?: string
  countryName: string
  streetAddress: string
  apartment?: string
  town: string
  postCode: number
  phone: number
  email: string
  orderNote?: string
  subTotal: number
  tax: number
  shipping: number
  total: number
  orderNumber?: string
  cardName?: string
  transactionId?: string
  status: 'Pending' | 'Shipped' | 'Delivered'
  deliveryProcess?: string
  isDeleted: boolean
  fullName?: string
}
