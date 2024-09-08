import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidations } from './product.validation'
import { ProductControllers } from './product.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
)

router.get('/', ProductControllers.getAllProduct)

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
)

export const ProductRoutes = router
