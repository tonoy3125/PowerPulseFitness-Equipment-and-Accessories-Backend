import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { Product } from '../products/product.model'
import { AddToCart } from './addToCart.model'
import { Types } from 'mongoose'

const createAddToCartItemIntoDB = async (
  productId: string,
  userId: string,
  quantity: number,
) => {
  // Find the product by productId
  const product = await Product.findById(productId)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found By Product Id')
  }

  // If the cart doesn't exist, create a new one
  let cart = await AddToCart.findOne({ userId })

  if (!cart) {
    cart = new AddToCart({
      userId,
      items: [],
      subTotal: 0, // Initialize total subtotal
    })
  }

  // Check if the product already exists in the cart
  const existingCartItem = cart.items.find(
    (item) => item.productId.toString() === productId.toString(),
  )

  if (existingCartItem) {
    // If the product is already in the cart, increase the quantity
    const newQuantity = existingCartItem.quantity + quantity
    if (newQuantity > product.stockQuantity) {
      throw new AppError(httpStatus.FORBIDDEN, 'Stock Quantity Exceeded')
    }
    existingCartItem.quantity = newQuantity
  } else {
    // If the product is not in the cart, add it as a new item
    cart.items.push({
      productId: new Types.ObjectId(productId),
      quantity: Math.min(quantity, product.stockQuantity),
      isDeleted: false,
    })
  }

  // Recalculate the total cart subtotal synchronously
  let subTotal = 0

  for (const item of cart.items) {
    const productInCart = await Product.findById(item.productId) // Fetch the product to get the price
    if (productInCart) {
      subTotal += item.quantity * productInCart.price
    }
  }

  // Assign the calculated subtotal to the cart
  cart.subTotal = subTotal

  // Save the cart with the updated items and total subtotal
  await cart.save()

  return cart
}

const getUserCartItemsFromDB = async (userId: string) => {
  // Find the cart by userId
  const cart = await AddToCart.findOne({ userId })
    .populate('items.productId')
    .populate('userId')

  return cart
}

const updateCartItemQuantity = async (
  userId: string,
  productId: string,
  change: number,
) => {
  const cart = await AddToCart.findOne({ userId })

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart Not Found')
  }

  const cartItem = cart.items.find(
    (item) => item.productId.toString() === productId.toString(),
  )

  if (!cartItem) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found In Cart')
  }

  const product = await Product.findById(productId)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found')
  }

  const newQuantity = cartItem.quantity + change

  if (newQuantity <= 0) {
    // Remove item if quantity is zero or less
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString(),
    )
  } else if (newQuantity > product.stockQuantity) {
    throw new AppError(httpStatus.FORBIDDEN, 'Stock Quantity Exceeded')
  } else {
    cartItem.quantity = newQuantity
  }

  cart.subTotal = await cart.items.reduce(async (totalPromise, item) => {
    const total = await totalPromise
    const productInCart = await Product.findById(item.productId)
    return total + (productInCart ? item.quantity * productInCart.price : 0)
  }, Promise.resolve(0))

  if (cart.items.length === 0) {
    await AddToCart.deleteOne({ userId })
  } else {
    await cart.save()
  }

  return cart
}

const increaseCartItemQuantity = async (userId: string, productId: string) => {
  return updateCartItemQuantity(userId, productId, 1)
}

const decreaseCartItemQuantity = async (userId: string, productId: string) => {
  return updateCartItemQuantity(userId, productId, -1)
}

const removeCartItemIntoDB = async (userId: string, productId: string) => {
  // Find the cart by userId
  const cart = await AddToCart.findOne({ userId })

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart Not Found')
  }

  // Find the item in the cart by productId
  const existingCartItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString(),
  )

  if (existingCartItemIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found In Cart')
  }

  // Remove the item from the cart
  cart.items.splice(existingCartItemIndex, 1)

  // Recalculate the total subtotal for all items in the cart
  cart.subTotal = await cart.items.reduce(async (totalPromise, item) => {
    const total = await totalPromise // Resolve previous total
    const product = await Product.findById(item.productId) // Fetch the product to get the price
    return total + (product ? item.quantity * product.price : 0)
  }, Promise.resolve(0))

  // If the cart has no more items, delete the cart itself
  if (cart.items.length === 0) {
    await AddToCart.deleteOne({ userId })
  } else {
    await cart.save()
  }

  return cart
}

export const AddToCartServices = {
  createAddToCartItemIntoDB,
  getUserCartItemsFromDB,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItemIntoDB,
}
