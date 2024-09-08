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

router.get('/:id', ProductControllers.getSingleProduct)

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
)

router.delete('/:id', auth(USER_ROLE.admin), ProductControllers.deleteProduct)

export const ProductRoutes = router
