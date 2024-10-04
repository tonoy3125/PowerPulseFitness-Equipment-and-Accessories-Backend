import { Wishlist } from './wishlist.model'

const addOrRemoveWishlistItem = async (userId: string, productId: string) => {
  // Find the existing wishlist item that is not deleted
  const existingItem = await Wishlist.findOne({
    userId,
    productId,
    isDeleted: false,
  })

  if (existingItem) {
    // If the item exists and is not deleted, mark it as deleted (i.e., remove from wishlist)
    await Wishlist.updateOne({ _id: existingItem._id }, { isDeleted: true })
    return { message: 'Product removed from wishlist' }
  } else {
    // If the item does not exist or is deleted, add it to the wishlist
    // First, check if an item exists in any state (deleted or not)
    const existingItemInAnyState = await Wishlist.findOne({ userId, productId })

    if (existingItemInAnyState) {
      // If the item exists but is deleted, update it to not be deleted
      if (existingItemInAnyState.isDeleted) {
        await Wishlist.updateOne(
          { _id: existingItemInAnyState._id },
          { isDeleted: false },
        )
        return { message: 'Product added back to wishlist' }
      }
    } else {
      // If the item does not exist at all, create a new wishlist entry
      const newItem = new Wishlist({ userId, productId, isDeleted: false })
      await newItem.save()
      return { message: 'Product added to wishlist' }
    }
  }
}

const getUserWishlistFromDB = async (userId: string) => {
  const result = await Wishlist.find({ userId, isDeleted: false })
    .populate('productId')
    .populate('userId')
  return result
}

const clearAllWishlistFromDB = async (userId: string) => {
  const result = await Wishlist.updateMany({ userId }, { isDeleted: true })
  return result
}

export const WishlistServices = {
  getUserWishlistFromDB,
  addOrRemoveWishlistItem,
  clearAllWishlistFromDB,
}
