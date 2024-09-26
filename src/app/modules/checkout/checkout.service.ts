import { Types } from 'mongoose'
import { TCheckout } from './checkout.interface'
import { Checkout } from './checkout.model'
import { Product } from '../products/product.model'

const createCheckoutIntoDB = async (payload: TCheckout) => {
  let session

  try {
    session = await Checkout.startSession()
    session.startTransaction()

    const result = await Checkout.create([payload], { session })
    console.log('Checkout created:', result)

    await deductStockFromProducts(payload.addToCartProduct, session)
    console.log(
      'Stock deduction executed for products:',
      payload.addToCartProduct,
    )

    await session.commitTransaction()
    return result[0]
  } catch (error) {
    if (session) await session.abortTransaction()
    console.error('Transaction aborted due to error:', error)
    throw error
  } finally {
    if (session) session.endSession()
  }
}

const deductStockFromProducts = async (
  products: { productId: Types.ObjectId; quantity: number }[],
  session: any,
) => {
  const bulkOps = products.map(({ productId, quantity }) => ({
    updateOne: {
      filter: { _id: productId },
      update: { $inc: { stockQuantity: -quantity } },
    },
  }))

  const result = await Product.bulkWrite(bulkOps, { session })
  console.log('Bulk write result:', result)
}

export const CheckoutServices = {
  createCheckoutIntoDB,
}
