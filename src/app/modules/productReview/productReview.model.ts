import { model, Schema } from 'mongoose'
import { TProductReview } from './productReview.interface'

const ProductReviewSchema = new Schema<TProductReview>(
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const ProductReview = model<TProductReview>(
  'ProductReview',
  ProductReviewSchema,
)
