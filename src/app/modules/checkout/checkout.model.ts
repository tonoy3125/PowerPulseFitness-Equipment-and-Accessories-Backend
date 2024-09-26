import { model, Schema } from 'mongoose'
import { TCheckout } from './checkout.interface'

const CheckoutSchema = new Schema<TCheckout>(
  {
    addToCartProduct: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
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
      required: false,
    },
    countryName: {
      type: String,
      required: true,
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
