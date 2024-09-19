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
  const result = await ProductServices.getAllProductFromDB(req?.query)
  // const products = result.result // Access the array of products

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Created Successfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.getSingleProductFromDB(id)
  sendResponse(res, {
    success: result ? true : false,
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result ? 'Product retrieved successfully' : 'No Data Found',
    data: result ? result : [],
  })
})

const getSingleCategory = catchAsync(async (req, res) => {
  const { category } = req.params
  const result = await ProductServices.getProductsByCategoryFromDB(category)
  sendResponse(res, {
    success: result ? true : false,
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result
      ? 'Product retrieved By Category successfully'
      : 'No Data Found',
    data: result ? result : [],
  })
})

const getSingleProductInCategory = catchAsync(async (req, res) => {
  const { category, id } = req.params
  const result = await ProductServices.getProductByIdInCategory(category, id)

  sendResponse(res, {
    success: result ? true : false,
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result ? 'Product retrieved successfully' : 'No Data Found',
    data: result ? result : [],
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
  getSingleProduct,
  getSingleCategory,
  getSingleProductInCategory,
  updateProduct,
  deleteProduct,
}
