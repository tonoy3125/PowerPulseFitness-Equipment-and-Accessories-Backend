import { model, Schema } from 'mongoose'
import { TCheckout } from './checkout.interface'

const CheckoutSchema = new Schema<TCheckout>(
  {
    addToCart: {
      type: Schema.Types.ObjectId,
      ref: 'AddToCart',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    countryName: {
      type: String,
      required: false,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      required: false,
    },
    town: {
      type: String,
      required: true,
    },
    postCode: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    orderNote: {
      type: String,
      required: false,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Checkout = model<TCheckout>('Checkout', CheckoutSchema)
