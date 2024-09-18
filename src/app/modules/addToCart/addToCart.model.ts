import { model, Schema } from 'mongoose'
import { TAddToCart } from './addToCart.interface'

const AddToCartSchema = new Schema<TAddToCart>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    orderNote: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const AddToCart = model<TAddToCart>('AddToCart', AddToCartSchema)
