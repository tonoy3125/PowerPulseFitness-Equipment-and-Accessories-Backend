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



export const AddressControllers = {
  createAddress,
}
