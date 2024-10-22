import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { TDiscountDurationUnit, TProduct } from './product.interface'
import { Product } from './product.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { productSearchableField } from './product.constant'
// import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
// import { v4 as uuidv4 } from 'uuid'

const createProductIntoDB = async (
  files: Express.Multer.File[],
  payload: TProduct,
) => {
  if (files && files.length > 0) {
    const uploadedImages = files.map((file) => {
      // Each file has a Cloudinary `path` (secure_url) returned
      return file.path
    })

    // Add uploaded image URLs to the payload
    payload.images = [...(payload.images || []), ...uploadedImages]
  }

  // Create the product with the updated payload
  const result = await Product.create(payload)
  return result
}

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  console.log('base query', query)

  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  // Sort in-stock products first
  productQuery.modelQuery = productQuery.modelQuery.sort({
    stockQuantity: -1, // In-stock products first
  })

  const meta = await productQuery.countTotal()
  const result = await productQuery.modelQuery
  // Separate out-of-stock products to the end
  const inStockProducts = result.filter((product) => product.stockQuantity > 0)
  const outOfStockProducts = result.filter(
    (product) => product.stockQuantity === 0,
  )
  const sortedResult = [...inStockProducts, ...outOfStockProducts]
  return { meta, result: sortedResult }
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id)
  return result
}

const getProductsByCategoryFromDB = async (category: string) => {
  // Aggregation pipeline
  const result = await Product.aggregate([
    {
      $match: {
        category: { $regex: new RegExp(`^${category}$`, 'i') },
      },
    },
    {
      $group: {
        _id: '$category',
        totalCount: { $sum: 1 },
        products: {
          // Include all product details
          $push: {
            _id: '$_id',
            name: '$name',
            category: '$category',
            price: '$price',
            sku: '$sku',
            stockQuantity: '$stockQuantity',
            description: '$description',
            images: '$images',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        },
      },
    },
    {
      $project: {
        category: '$_id',
        totalCount: 1,
        products: 1,
      },
    },
  ])

  return result
}

const getProductByIdInCategory = async (category: string, id: string) => {
  const product = await Product.findOne({
    _id: id,
    category: { $regex: new RegExp(`^${category}$`, 'i') },
  })
  return product
}

const getCategoryProductCounts = async () => {
  const result = await Product.aggregate([
    {
      $match: {
        isDeleted: false, // Add any condition to filter products (optional)
      },
    },
    {
      $group: {
        _id: '$category', // Group by category
        totalProducts: { $sum: 1 }, // Count total products in each category
        inStockCount: {
          $sum: { $cond: [{ $gt: ['$stockQuantity', 0] }, 1, 0] },
        }, // Count in-stock products
        outOfStockCount: {
          $sum: { $cond: [{ $eq: ['$stockQuantity', 0] }, 1, 0] },
        }, // Count out-of-stock products
      },
    },
    {
      $project: {
        _id: 0, // Exclude `_id` field from result
        category: '$_id', // Rename `_id` to category
        totalProducts: 1, // Include the total count
        inStockCount: 1, // Include in-stock count
        outOfStockCount: 1, // Include out-of-stock count
      },
    },
    {
      $sort: { totalProducts: -1 }, // Sort categories by product count in descending order
    },
  ])

  return result
}

const getTotalCountStockAndOutOfStock = async () => {
  // Get the count of products that are in stock
  const totalInStockCount = await Product.countDocuments({
    stockQuantity: { $gt: 0 },
  })

  // Get the count of products that are out of stock
  const totalOutOfStockCount = await Product.countDocuments({
    stockQuantity: { $eq: 0 },
  })

  return {
    totalInStockCount,
    totalOutOfStockCount,
  }
}

const updateProductIntoDB = async (
  id: string,
  payload: Partial<TProduct>,
  files: Express.Multer.File[],
) => {
  const product = await Product.findById(id)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  // If there are new images to upload
  if (files && files.length > 0) {
    const uploadedImages = files.map((file) => {
      // Use the file path directly for local storage
      return file.path
    })

    // Append new images to the existing ones
    payload.images = [...(product.images || []), ...uploadedImages]
  }

  // Update other fields if they exist in the payload
  const updatedPayload = { ...payload }

  const updatedProduct = await Product.findByIdAndUpdate(id, updatedPayload, {
    new: true, // Return the updated product
    runValidators: true, // Ensure that validation is applied
  })

  return updatedProduct
}

const updateDiscountIntoDB = async (
  sku: string,
  percentage: number,
  duration: number,
  durationUnit: TDiscountDurationUnit, // Default to hours
) => {
  const product = await Product.findOne({ sku })
  console.log(product)
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  // Ensure percentage and duration are valid
  if (percentage <= 0 || percentage > 100) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid discount percentage')
  }

  if (duration <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid discount duration')
  }

  // Calculate discount price
  const discountAmount = (product.price * percentage) / 100
  const discountPrice = parseFloat((product.price - discountAmount).toFixed(2))

  // Calculate discount end time based on the unit
  const durationInMillis =
    duration *
    {
      Minutes: 60 * 1000,
      Hours: 60 * 60 * 1000,
      Days: 24 * 60 * 60 * 1000,
    }[durationUnit]

  const discountEndTime = new Date(Date.now() + durationInMillis)

  // Update product with discount info
  product.discountPrice = discountPrice
  product.discountPercentage = percentage
  product.discountStartTime = new Date() // current time
  product.discountEndTime = discountEndTime // set the calculated end time
  product.discountDuration = duration // duration in minutes, hours, or days
  product.discountDurationUnit = durationUnit
  await product.save()

  return product
}

const checkAndRemoveExpiredDiscounts = async () => {
  const now = new Date()

  // Find products where discount is active and not expired
  const products = await Product.find({
    discountPercentage: { $gt: 0 },
    discountStartTime: { $exists: true },
    discountEndTime: { $exists: true }, // Use discountEndTime
  })

  for (const product of products) {
    // If discount is expired, reset discount info
    if (product.discountEndTime && now >= product.discountEndTime) {
      product.discountPrice = 0
      product.discountPercentage = 0
      product.discountStartTime = undefined
      product.discountEndTime = undefined // Reset end time
      product.discountDuration = undefined // Reset duration
      product.discountDurationUnit = undefined // Reset duration unit
      product.advertise = false
      await product.save()
    }
  }
}

const getDiscountedProductsFromDB = async () => {
  const result = await Product.find({
    discountPercentage: { $gt: 0 }, // Find products where discountPercentage is greater than 0
  }).sort({ discountPercentage: -1 }) // Sort by discount in descending order

  return result
}

const removeDiscountByIdFromDB = async (id: string) => {
  const product = await Product.findById(id)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  // Reset discount-related fields
  product.discountPrice = 0
  product.discountPercentage = 0
  product.discountStartTime = undefined
  product.discountEndTime = undefined
  product.discountDuration = undefined
  product.discountDurationUnit = undefined
  product.advertise = false

  await product.save()

  return product
}

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

const addAdvertiseDiscountProduct = async (id: string) => {
  const product = await Product.findById(id)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  if (product.discountPercentage == null || product.discountPercentage <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Product must have a discount to be advertised',
    )
  }

  // Update the product to set advertise to true
  product.advertise = true
  await product.save()

  return product
}

const removeAdvertiseDiscountProduct = async (id: string) => {
  const product = await Product.findById(id)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  // Update the product to set advertise to false
  product.advertise = false
  await product.save()

  return product
}

const getAdvertisedProductsFromDB = async () => {
  const result = await Product.find({ advertise: true }).sort({ updatedAt: -1 })
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getProductsByCategoryFromDB,
  getProductByIdInCategory,
  getCategoryProductCounts,
  getTotalCountStockAndOutOfStock,
  updateProductIntoDB,
  updateDiscountIntoDB,
  checkAndRemoveExpiredDiscounts,
  getDiscountedProductsFromDB,
  removeDiscountByIdFromDB,
  deleteProductFromDB,
  addAdvertiseDiscountProduct,
  removeAdvertiseDiscountProduct,
  getAdvertisedProductsFromDB,
}
