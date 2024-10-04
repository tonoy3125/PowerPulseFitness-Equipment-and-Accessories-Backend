import { z } from 'zod'
import { TCategoryTypes } from './product.constant'

const numberFromString = (val: string | number): number | undefined => {
  const parsed = parseFloat(val as string)
  return isNaN(parsed) ? undefined : parsed // Return undefined for invalid numbers
}

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    price: z
      .union([z.number(), z.string()]) // Allow both number and string
      .transform(numberFromString) // Transform string to number
      .refine((val) => val !== undefined, {
        message: 'Price must be a valid number',
      }),
    sku: z.string({ required_error: 'Sku is required' }),
    stockQuantity: z
      .union([z.number(), z.string()]) // Allow both number and string
      .transform(numberFromString) // Transform string to number
      .refine((val) => val !== undefined, {
        message: 'Stock quantity must be a valid number',
      }),
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
    price: z
      .union([z.number(), z.string()]) // Allow both number and string
      .transform(numberFromString) // Transform string to number
      .refine((val) => val !== undefined, {
        message: 'Price must be a valid number',
      })
      .optional(),
    sku: z.string({ required_error: 'Sku is required' }).optional(),
    stockQuantity: z
      .union([z.number(), z.string()]) // Allow both number and string
      .transform(numberFromString) // Transform string to number
      .refine((val) => val !== undefined, {
        message: 'Stock quantity must be a valid number',
      })
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

const updateDiscountValidationSchema = z.object({
  body: z.object({
    sku: z.string().min(1, 'SKU is required'),
    percentage: z
      .number()
      .min(0)
      .max(100, 'Percentage must be between 0 and 100'),
  }),
})

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
  updateDiscountValidationSchema,
}
