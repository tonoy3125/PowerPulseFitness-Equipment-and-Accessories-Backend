import { model, Schema } from 'mongoose'
import { TWishlist } from './wishlist.interface'

const WishlistSchema = new Schema<TWishlist>(
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Wishlist = model<TWishlist>('Wishlist', WishlistSchema)
