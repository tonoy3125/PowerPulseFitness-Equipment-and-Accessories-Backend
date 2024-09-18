import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { Product } from '../products/product.model'
import { AddToCart } from './addToCart.model'

const createAddToCartItemIntoDB = async (
  productId: string,
  userId: string,
  quantity: number,
) => {
  // Find The Product By Product Id
  const product = await Product.findById(productId)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found By Product Id')
  }

  //   If the cart doesn't exist, create a new one
  let cart = await AddToCart.findOne({ userId })

  if (!cart) {
    cart = new AddToCart({
      userId,
      items: [],
    })
  }

  //   Check if the product already exists in the cart
  const existingCartItem = cart.items.find(
    (item) => item.productId.toString() === productId.toString(),
  )

  if (existingCartItem) {
    // If the product is already in the cart, increase the quantity, ensuring it doesn't exceed the stock quantity
    const newQuantity = existingCartItem.quantity + quantity
    if (newQuantity > product.stockQuantity) {
      throw new AppError(httpStatus.FORBIDDEN, 'Stock Quantity Exceeded')
    }
    existingCartItem.quantity = newQuantity
    existingCartItem.subTotal = existingCartItem.quantity * product.price
  } else {
    // If the product is not in the cart, add it as a new item
    cart.items.push({
      productId,
      quantity: Math.min(quantity, product.stockQuantity),
      subTotal: quantity * product.price,
      isDeleted: false,
    })
  }
  // Save the cart with the updated items
  await cart.save()

  return cart
}

const getUserCartItemsFromDB = async (userId: string) => {
  // Find the cart by userId
  const cart = await AddToCart.findOne({ userId })

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart Not Found for the User')
  }

  return cart
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

  // If the cart has no more items, you can decide to delete the cart itself or leave it empty
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
  removeCartItemIntoDB,
}
