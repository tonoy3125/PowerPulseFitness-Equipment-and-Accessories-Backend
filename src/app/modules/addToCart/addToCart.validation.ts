import { z } from 'zod'

const createAddToCartValidationSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product is required' }),
    userId: z.string({ required_error: 'User is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
  }),
})

const updateCartItemValidationSchema = z.object({
  body: z.object({
    productId: z
      .string({ required_error: 'Product is required' })
      .nonempty('Product ID cannot be empty'), // Required and non-empty productId
  }),
})

export const AddToCardValidations = {
  createAddToCartValidationSchema,
  updateCartItemValidationSchema,
}
