import { model, Schema } from 'mongoose'
import { TAddToCart } from './addToCart.interface'

const AddToCartSchema = new Schema<TAddToCart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    subTotal: {
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

export const AddToCart = model<TAddToCart>('AddToCart', AddToCartSchema)
