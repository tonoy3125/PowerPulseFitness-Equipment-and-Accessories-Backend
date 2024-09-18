import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { Product } from '../products/product.model'
import { AddToCart } from './addToCart.model'

const createAddToCartItem = async (
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

export const AddToCartServices = {
  createAddToCartItem,
}
