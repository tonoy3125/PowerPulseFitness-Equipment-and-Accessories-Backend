import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { ProductRoutes } from '../modules/products/product.route'

const router = express.Router()

const routerModules = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
]

export const routes = routerModules.map((item) =>
  router.use(item?.path, item?.route),
)
