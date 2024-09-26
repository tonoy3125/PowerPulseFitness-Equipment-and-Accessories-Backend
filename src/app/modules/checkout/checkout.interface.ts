import { Types } from 'mongoose'

export type TCheckout = {
  addToCartProduct: Types.ObjectId
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
  isDeleted: boolean
}
