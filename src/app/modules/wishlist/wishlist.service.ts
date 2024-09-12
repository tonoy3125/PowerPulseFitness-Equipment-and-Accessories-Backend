import { TWishlist } from './wishlist.interface'
import { Wishlist } from './wishlist.model'

const createWishlistIntoDB = async (payload: TWishlist) => {
  const result = await Wishlist.create(payload)
  return result
}

export const WishlistServices = {
  createWishlistIntoDB,
}
