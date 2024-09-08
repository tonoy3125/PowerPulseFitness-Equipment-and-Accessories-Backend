import { z } from 'zod'
import { TCategoryTypes } from './product.constant'

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    price: z.number({ required_error: 'Price is required' }),
    sku: z.string({ required_error: 'Sku is required' }),
    stockQuantity: z.number({ required_error: 'Stock quantity is required' }),
    description: z.string({ required_error: 'Description is required' }),
    images: z
      .array(z.string(), { required_error: 'Images are required' })
      .min(1, { message: 'At least one image is required' }),
    category: z.enum(TCategoryTypes, {
      required_error: 'Category is required',
    }),
  }),
})

export const ProductValidations = {
  createProductValidationSchema,
}
