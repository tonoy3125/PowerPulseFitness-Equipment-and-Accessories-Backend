import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { CheckoutServices } from './checkout.service'

const createCheckOut = catchAsync(async (req, res) => {
  //   const userId = req.user._id
  const result = await CheckoutServices.createCheckoutIntoDB(req?.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Place Order Created successfully!',
    data: result,
  })
})

const getSingleCheckoutByOrderId = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CheckoutServices.getSingleCheckoutByOrderIdFromDB(id)
  sendResponse(res, {
    success: result ? true : false,
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result ? 'Order retrieved successfully' : 'No Data Found',
    data: result ? result : [],
  })
})

const getAllOrder = catchAsync(async (req, res) => {
  const result = await CheckoutServices.getAllOrderFromDB(req?.query)
  // const products = result.result // Access the array of products

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Order retrieved Successfully!',
    meta: result.meta,
    data: result.result,
  })
})

const getUserOrderItems = catchAsync(async (req, res) => {
  const userId = req.user!._id
  // console.log(userId)

  const result = await CheckoutServices.getUserOrderItemsFromDB(userId)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User All Orders Retrieved Successfully',
    data: result,
  })
})

export const CheckoutControllers = {
  createCheckOut,
  getSingleCheckoutByOrderId,
  getAllOrder,
  getUserOrderItems,
}
