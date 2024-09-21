import { z } from 'zod'
import { TCategoryTypes } from './product.constant'

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    price: z.number({ required_error: 'Price is required' }),
    sku: z.string({ required_error: 'Sku is required' }),
    stockQuantity: z.number({ required_error: 'Stock quantity is required' }),
    shortDescription: z.string({
      required_error: 'Short Description is required',
    }),
    longDescription: z.string({
      required_error: 'Long Description is required',
    }),
    // images: z
    //   .array(z.string(), { required_error: 'Images are required' })
    //   .min(1, { message: 'At least one image is required' }),
    category: z.enum(TCategoryTypes, {
      required_error: 'Category is required',
    }),
  }),
})

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    price: z.number({ required_error: 'Price is required' }).optional(),
    sku: z.string({ required_error: 'Sku is required' }).optional(),
    stockQuantity: z
      .number({ required_error: 'Stock quantity is required' })
      .optional(),
    shortDescription: z
      .string({ required_error: 'Short Description is required' })
      .optional(),
    longDescription: z
      .string({ required_error: 'Long Description is required' })
      .optional(),
    // images: z
    //   .array(z.string(), { required_error: 'Images are required' })
    //   .min(1, { message: 'At least one image is required' })
    //   .optional(),
    category: z
      .enum(TCategoryTypes, {
        required_error: 'Category is required',
      })
      .optional(),
  }),
})

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
}
