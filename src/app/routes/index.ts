import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { ProductRoutes } from '../modules/products/product.route'
import { WishlistRoutes } from '../modules/wishlist/wishlist.route'
import { AddToCartRoutes } from '../modules/addToCart/addToCart.route'
import { CheckoutRoutes } from '../modules/checkout/checkout.route'
import { ProductReviewRoutes } from '../modules/productReview/productReview.route'
import PaymentRoute from '../modules/payment/payment.route'
import { AddressRoutes } from '../modules/address/address.route'

const router = express.Router()

const routerModules = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/address',
    route: AddressRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/addToCart',
    route: AddToCartRoutes,
  },
  {
    path: '/checkout',
    route: CheckoutRoutes,
  },
  {
    path: '/review',
    route: ProductReviewRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoute,
  },
]

export const routes = routerModules.map((item) =>
  router.use(item?.path, item?.route),
)
