import { model, Schema } from 'mongoose'
import { TAddress } from './address.interface'

const AddressSchema = new Schema<TAddress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    countryName: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    apartment: {
      type: String,
    },
    town: {
      type: String,
    },
    postCode: {
      type: Number,
    },
    phone: {
      type: Number,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Address = model<TAddress>('Address', AddressSchema)
