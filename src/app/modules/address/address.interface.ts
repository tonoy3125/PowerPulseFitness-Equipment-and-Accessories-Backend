import { Types } from 'mongoose'

export type TAddress = {
  userId: Types.ObjectId
  firstName?: string
  lastName?: string
  companyName?: string
  countryName?: string
  streetAddress?: string
  apartment?: string
  town?: string
  postCode?: number
  phone?: number
  isDefault: boolean
  isDeleted: boolean
}
