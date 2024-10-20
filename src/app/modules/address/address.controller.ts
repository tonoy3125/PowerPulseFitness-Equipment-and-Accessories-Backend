import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { AddressServices } from './address.service'

const createAddress = catchAsync(async (req, res) => {
  //   const userId = req.user._id
  const result = await AddressServices.createAddressIntoDB(req?.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Default Address Created successfully!',
    data: result,
  })
})

const getUserAddress = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const result = await AddressServices.getUserAddressFromDB(userId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Address retrived successfully!',
    data: result,
  })
})

const updateAddress = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AddressServices.updateAddressIntoDB(id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Default Address updated successfully!',
    data: result,
  })
})

const deleteAddress = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AddressServices.deleteAddressFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Address Deleted successfully!',
    data: result,
  })
})

export const AddressControllers = {
  createAddress,
  getUserAddress,
  updateAddress,
  deleteAddress,
}
