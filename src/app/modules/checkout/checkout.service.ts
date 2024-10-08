/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose'
import { TCheckout } from './checkout.interface'
import { Checkout } from './checkout.model'
import { Product } from '../products/product.model'
import { AddToCart } from '../addToCart/addToCart.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { checkoutProductSearchableField } from './checkout.constant'

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

    // Create the checkout in the DB with the generated order number
    const result = await Checkout.create([{ ...payload, orderNumber }], {
      session,
    })
    console.log('Checkout created with order number:', result)

    // Deduct stock from products
    await deductStockFromProducts(payload.addToCartProduct, session)
    console.log(
      'Stock deduction executed for products:',
      payload.addToCartProduct,
    )

    // Commit the transaction
    await session.commitTransaction()

    // Remove all cart items for the user after placing the order
    await removeUserCart(payload.userId)
    console.log('User cart cleared after placing the order:', payload.userId)

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

// Function to remove all cart items for a user
const removeUserCart = async (userId: Types.ObjectId) => {
  const result = await AddToCart.deleteMany({ userId }) // Remove all cart items for the user
  console.log('Cart cleared for user:', userId, result)
}

const getSingleCheckoutByOrderIdFromDB = async (id: string) => {
  const result = await Checkout.findById(id).populate(
    'addToCartProduct.productId',
  )
  return result
}

const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  const checkoutQuery = new QueryBuilder(
    Checkout.find().populate('userId').populate('addToCartProduct.productId'),
    query,
  )
    .search(checkoutProductSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await checkoutQuery.countTotal()
  const result = await checkoutQuery.modelQuery
  return { meta, result }
}

const getUserOrderItemsFromDB = async (userId: string) => {
  // Find the cart by userId
  const result = await Checkout.find({ userId })
    .populate('userId')
    .populate('addToCartProduct.productId')

  return result
}

const updateOrderStatusIntoDB = async (id: string, newStatus: string) => {
  const order = await Checkout.findById(id)
  if (!order) throw new Error('Order not found')

  const currentStatus = order.status

  if (currentStatus === 'Pending' && newStatus === 'Shipped') {
    order.status = 'Shipped'
  } else if (currentStatus === 'Shipped' && newStatus === 'Delivered') {
    order.status = 'Delivered'
  } else if (currentStatus === 'Pending' && newStatus === 'Delivered') {
    order.status = 'Delivered'
  } else {
    throw new Error(
      `Cannot update status from ${currentStatus} to ${newStatus}`,
    )
  }

  await order.save()
  return { oldStatus: currentStatus, newStatus: order.status }
}

const deleteOrderFromDB = async (id: string) => {
  const result = await Checkout.findByIdAndDelete(id)
  return result
}

export const CheckoutServices = {
  createCheckoutIntoDB,
  getSingleCheckoutByOrderIdFromDB,
  getAllOrderFromDB,
  getUserOrderItemsFromDB,
  updateOrderStatusIntoDB,
  deleteOrderFromDB,
}
