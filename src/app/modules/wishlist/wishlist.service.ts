import { TWishlist } from './wishlist.interface'
import { Wishlist } from './wishlist.model'

const createWishlistIntoDB = async (payload: TWishlist) => {
  const result = await Wishlist.create(payload)
  return result
}

const removeWishlistIntoDB = async (productId: string) => {
  const result = await Wishlist.findOneAndUpdate(
    { productId },
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const WishlistServices = {
  createWishlistIntoDB,
  removeWishlistIntoDB,
}
