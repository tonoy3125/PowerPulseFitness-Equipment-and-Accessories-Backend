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

export const WishlistControllers = {
  createWishlist,
  removeWishlist,
}
