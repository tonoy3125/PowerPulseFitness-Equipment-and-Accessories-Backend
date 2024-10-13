import { z } from 'zod'

const createProductReviewValidationSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product ID is required' }),
    userId: z.string({ required_error: 'User ID is required' }),
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    rating: z
      .number({ required_error: 'Rating is required' })
      .min(1, { message: 'Rating must be at least 1 star' })
      .max(5, { message: 'Rating cannot exceed 5 stars' }),
    review: z.string({ required_error: 'Review is required' }),
  }),
})

export const ProductReviewValidations = {
  createProductReviewValidationSchema,
}
