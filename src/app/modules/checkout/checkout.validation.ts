import { z } from 'zod'

const createCheckoutValidationSchema = z.object({
  body: z.object({
    addToCart: z.string({ required_error: 'Add To Cart is required' }),
    userId: z.string({ required_error: 'User ID is required' }),
    firstName: z.string({ required_error: 'First Name is required' }),
    lastName: z.string({ required_error: 'Last Name is required' }),
    companyName: z.string().optional(),
    countryName: z.string({ required_error: 'Country Name is required' }),
    streetAddress: z.string({ required_error: 'Street Address is required' }),
    apartment: z.string().optional(),
    town: z.string({ required_error: 'Town is required' }),
    postCode: z.number({ required_error: 'Post Code is required' }),
    phone: z.number({ required_error: 'Phone number is required' }),
    email: z.string({ required_error: 'Email is required' }),
    orderNote: z.string().optional(),
    subTotal: z.number({ required_error: 'Subtotal is required' }),
    tax: z.number({ required_error: 'Tax is required' }),
    shipping: z.number({ required_error: 'Shipping is required' }),
    total: z.number({ required_error: 'Total is required' }),
  }),
})

export const CheckoutValidations = {
  createCheckoutValidationSchema,
}
