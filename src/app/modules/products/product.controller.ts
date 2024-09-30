import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductServices } from './product.service'

const createProduct = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } // Type the files object properly

  // Extract the 'images' field which contains multiple files
  const imageFiles = files?.images || []
  console.log(imageFiles)

  const result = await ProductServices.createProductIntoDB(imageFiles, req.body)

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
  const files = req.files as { [fieldname: string]: Express.Multer.File[] }

  // Extract the 'images' field if files are present
  const imageFiles = files?.images || []
  const result = await ProductServices.updateProductIntoDB(
    id,
    req.body,
    imageFiles,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully!',
    data: result,
  })
})

const updateDiscount = catchAsync(async (req, res) => {
  const { sku, percentage, duration, durationUnit } = req.body // Include durationUnit
  const result = await ProductServices.updateDiscountIntoDB(
    sku,
    percentage,
    duration,
    durationUnit,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Discount updated successfully!',
    data: result,
  })
})

const removeExpiredDiscounts = catchAsync(async (req, res) => {
  const result = await ProductServices.checkAndRemoveExpiredDiscounts()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expired discounts checked and removed!!',
    data: result,
  })
})

const getDiscountedProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getDiscountedProductsFromDB()

  sendResponse(res, {
    success: result.length > 0 ? true : false,
    statusCode: result.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
    message:
      result.length > 0
        ? 'Discounted products retrieved successfully'
        : 'No discounted products found',
    data: result,
  })
})

const removeDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.removeDiscountByIdFromDB(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Discount removed successfully!',
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

const addAdvertiseDiscountById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.addAdvertiseDiscountProduct(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Advertise Added successfully!',
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
  updateDiscount,
  removeExpiredDiscounts,
  getDiscountedProducts,
  removeDiscountById,
  deleteProduct,
  addAdvertiseDiscountById,
}
