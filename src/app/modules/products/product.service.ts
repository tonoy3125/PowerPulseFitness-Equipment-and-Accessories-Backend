import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload)
  return result
}

const getAllProductFromDB = async () => {
  const result = await Product.find()
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

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  updateProductIntoDB,
}
