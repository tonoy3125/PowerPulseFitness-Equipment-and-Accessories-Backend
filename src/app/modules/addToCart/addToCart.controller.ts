import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AddToCartServices } from './addToCart.service'

const createAddToCart = catchAsync(async (req, res) => {
  const result = await AddToCartServices.createAddToCartItem(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Add To Cart Created Successfully',
    data: result,
  })
})

export const ProductControllers = {
  createAddToCart,
}
