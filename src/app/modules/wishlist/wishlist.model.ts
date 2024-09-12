import { model, Schema } from 'mongoose'
import { TWishlist } from './wishlist.interface'

const WishlistSchema = new Schema<TWishlist>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Wishlist = model<TWishlist>('Wishlist', WishlistSchema)
