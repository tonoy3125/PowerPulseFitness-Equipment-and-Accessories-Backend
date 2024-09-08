import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductServices } from './product.service'

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Created Successfully',
    data: result,
  })
})

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB()
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length ? 'Product retrieved successfully' : 'No Data Found',
    data: result,
  })
})


const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.updateProductIntoDB(id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully!',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.deleteProductFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully!',
    data: result,
  })
})

export const ProductControllers = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
}
