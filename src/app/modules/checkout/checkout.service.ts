import { TCheckout } from './checkout.interface'
import { Checkout } from './checkout.model'

const createCheckoutIntoDB = async (payload: TCheckout) => {
  const result = await Checkout.create(payload)
  return result
}

export const CheckoutServices = {
  createCheckoutIntoDB,
}
