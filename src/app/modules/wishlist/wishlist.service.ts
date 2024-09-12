import { TWishlist } from './wishlist.interface'
import { Wishlist } from './wishlist.model'

const createWishlistIntoDB = async (payload: TWishlist) => {
  const result = await Wishlist.create(payload)
  return result
}

const getAllWishlistFromDB = async () => {
  const result = await Wishlist.find().populate('productId').populate('userId')
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

const clearAllWishlistFromDB = async () => {
  const result = await Wishlist.updateMany({}, { isDeleted: true })
  return result
}

export const WishlistServices = {
  createWishlistIntoDB,
  getAllWishlistFromDB,
  removeWishlistIntoDB,
  clearAllWishlistFromDB,
}
