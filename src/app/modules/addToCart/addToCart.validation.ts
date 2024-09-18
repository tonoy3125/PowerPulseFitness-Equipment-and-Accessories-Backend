import { z } from 'zod'

const createAddToCartValidationSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product is required' }),
    userId: z.string({ required_error: 'User is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
    subTotal: z.number({ required_error: 'Sub Total is required' }),
    orderNote: z.string({ required_error: 'Order Note is required' }),
  }),
})

export const AddToCardValidations = {
  createAddToCartValidationSchema,
}
