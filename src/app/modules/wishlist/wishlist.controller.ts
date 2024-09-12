import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { WishlistServices } from './wishlist.service'

const createWishlist = catchAsync(async (req, res) => {
  const result = await WishlistServices.createWishlistIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Added To wishlist Successfully',
    data: result,
  })
})

const getAllWishlist = catchAsync(async (req, res) => {
  const result = await WishlistServices.getAllWishlistFromDB()
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? 'Wishlist retrieved successfully'
      : 'No Data Found',
    data: result,
  })
})

const removeWishlist = catchAsync(async (req, res) => {
  const { productId } = req.params

  const result = await WishlistServices.removeWishlistIntoDB(productId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Remove To wishlist Successfully',
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
  createWishlist,
  getAllWishlist,
  removeWishlist,
  clearAllWishlist,
}
