import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { TProduct } from './product.interface'
import { Product } from './product.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { productSearchableField } from './product.constant'

const createProductIntoDB = async (payload: TProduct) => {
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

  const meta = await productQuery.countTotal()
  const result = await productQuery.modelQuery
  return { meta, result }
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
      $project: {
        name: 1,
        price: 1,
        sku: 1,
        stockQuantity: 1,
        description: 1,
        images: 1,
        category: 1,
        isDeleted: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ])

  return result
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
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getProductsByCategoryFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
