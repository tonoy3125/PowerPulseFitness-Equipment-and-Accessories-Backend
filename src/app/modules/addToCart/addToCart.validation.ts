import { z } from 'zod'

const createAddToCartValidationSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product is required' }),
    userId: z.string({ required_error: 'User is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
  }),
})

const updateCartItemValidationSchema = z.object({
  productId: z.string().uuid().nonempty(),
})

export const AddToCardValidations = {
  createAddToCartValidationSchema,
  updateCartItemValidationSchema,
}
