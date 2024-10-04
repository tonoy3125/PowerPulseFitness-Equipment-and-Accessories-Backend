import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AddToCartServices } from './addToCart.service'

const createAddToCart = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { productId, quantity } = req.body

  const result = await AddToCartServices.createAddToCartItemIntoDB(
    productId,
    userId,
    quantity,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Add To Cart Created Successfully',
    data: result,
  })
})

const getUserCartItems = catchAsync(async (req, res) => {
  const userId = req.user!._id

  const cart = await AddToCartServices.getUserCartItemsFromDB(userId)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Cart Retrieved Successfully',
    data: cart,
  })
})

const increaseQuantity = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { productId } = req.body

  const result = await AddToCartServices.increaseCartItemQuantity(
    userId,
    productId,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart Item Quantity Increased Successfully',
    data: result,
  })
})

const decreaseQuantity = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { productId } = req.body

  const result = await AddToCartServices.decreaseCartItemQuantity(
    userId,
    productId,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart Item Quantity Decreased Successfully',
    data: result,
  })
})

const removeCartItem = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { productId } = req.body

  const result = await AddToCartServices.removeCartItemIntoDB(userId, productId)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart Item Removed Successfully',
    data: result,
  })
})

export const AddToCartControllers = {
  createAddToCart,
  getUserCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
}
