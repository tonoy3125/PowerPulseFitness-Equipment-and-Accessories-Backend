import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { WishlistServices } from './wishlist.service'

const toggleWishlistItem = catchAsync(async (req, res) => {
  const userId = req.user._id // Assuming req.user contains the authenticated user's data
  const { productId } = req.params // Assuming productId is passed as a URL parameter

  const result = await WishlistServices.addOrRemoveWishlistItem(
    userId,
    productId,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: result,
  })
})

const getUserWishlist = catchAsync(async (req, res) => {
  const userId = req.user._id // Assuming req.user contains the authenticated user's data
  const result = await WishlistServices.getUserWishlistFromDB(userId)
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? 'Wishlist retrieved successfully'
      : 'No Data Found',
    data: result,
  })
})

const clearAllWishlist = catchAsync(async (req, res) => {
  const result = await WishlistServices.clearAllWishlistFromDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All wishlists cleared successfully',
    data: result,
  })
})

export const WishlistControllers = {
  getUserWishlist,
  toggleWishlistItem,
  clearAllWishlist,
}
