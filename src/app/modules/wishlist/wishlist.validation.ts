import { z } from 'zod'

const createWishlistValidationSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product is required' }),
    userId: z.string({ required_error: 'User is required' }),
  }),
})

export const WishlistValidations = {
  createWishlistValidationSchema,
}
