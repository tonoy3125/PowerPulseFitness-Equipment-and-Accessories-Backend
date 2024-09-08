import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidations } from './product.validation'
import { ProductControllers } from './product.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
)

export const ProductRoutes = router
