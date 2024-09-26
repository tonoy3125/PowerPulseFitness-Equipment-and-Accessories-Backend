import { Types } from 'mongoose'
import { TCheckout } from './checkout.interface'
import { Checkout } from './checkout.model'
import { Product } from '../products/product.model'

// Function to generate a unique 5-digit order number
const generateOrderNumber = () => {
  const randomPart = Math.floor(10000 + Math.random() * 90000) // Ensures a 5-digit number
  return `ORDER-${randomPart}`
}

const createCheckoutIntoDB = async (payload: TCheckout) => {
  let session

  try {
    session = await Checkout.startSession()
    session.startTransaction()

    // Generate the order number before creating the checkout entry
    const orderNumber = generateOrderNumber()
    console.log(orderNumber)

    // Create the checkout in the DB with the generated order number
    const result = await Checkout.create(
      [{ ...payload, orderNumber }], // Add the order number here
      { session },
    )
    console.log('Checkout created with order number:', result)

    // Deduct stock from products
    await deductStockFromProducts(payload.addToCartProduct, session)
    console.log(
      'Stock deduction executed for products:',
      payload.addToCartProduct,
    )

    // Commit the transaction
    await session.commitTransaction()
    return result[0] // Return the created checkout entry
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
