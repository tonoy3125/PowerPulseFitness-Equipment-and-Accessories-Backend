/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { TProduct } from './product.interface'
import { Product } from './product.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { productSearchableField } from './product.constant'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'

const createProductIntoDB = async (
  files: Express.Multer.File[],
  payload: TProduct,
) => {
  if (files && files.length > 0) {
    const imageNamePrefix = `${payload?.name}-${payload?.category}`

    // Upload each image to Cloudinary
    const uploadedImages = await Promise.all(
      files.map(async (file, index) => {
        const imageName = `${imageNamePrefix}-${index + 1}`
        const path = file.path

        // Upload to Cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path)
        return secure_url as string
      }),
    )

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

const getProductsByCategoryFromDB = async (category) => {
  // Aggregation pipeline
  const result = await Product.aggregate([
    {
      $match: {
        category: { $regex: new RegExp(`^${category}$`, 'i') },
      },
    },
    {
      $group: {
        _id: '$category', // Group by category
        totalCount: { $sum: 1 }, // Count each product in the category
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

const getProductByIdInCategory = async (category, id) => {
  const product = await Product.findOne({
    _id: id,
    category: { $regex: new RegExp(`^${category}$`, 'i') },
  })
  return product
}

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const product = await Product.findById(id)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found by this id')
  }

  const result = await Product.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getProductsByCategoryFromDB,
  getProductByIdInCategory,
  updateProductIntoDB,
  deleteProductFromDB,
}
