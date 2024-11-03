import { model, Schema } from 'mongoose'
import { TCheckout } from './checkout.interface'

const CheckoutSchema = new Schema<TCheckout>(
  {
    addToCartProduct: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Ensuring quantity is at least 1
        },
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
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
    orderNumber: {
      type: String,
    },
    cardName: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    deliveryProcess: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
      required: false, // This field is optional
    },
  },
  { timestamps: true },
)

CheckoutSchema.pre('save', function (next) {
  if (this.isModified('firstName') || this.isModified('lastName')) {
    this.fullName = `${this.firstName} ${this.lastName}`
  }
  next()
})

export const Checkout = model<TCheckout>('Checkout', CheckoutSchema)
