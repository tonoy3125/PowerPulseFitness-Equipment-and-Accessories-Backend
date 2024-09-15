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

const removeWishlistIntoDB = async (productId: string, userId: string) => {
  const result = await Wishlist.findOneAndUpdate(
    { productId, userId },
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
