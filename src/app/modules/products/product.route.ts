import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidations } from './product.validation'
import { ProductControllers } from './product.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  upload, // Multer middleware for file upload
  (req: Request, res: Response, next: NextFunction) => {
    // Parse form-data body sent as JSON
    req.body = JSON.parse(req?.body?.data)
    console.log(req?.body)
    next()
  },
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
)

router.get('/', ProductControllers.getAllProduct)

router.get('/:id', ProductControllers.getSingleProduct)
router.get('/category/:category', ProductControllers.getSingleCategory)
router.get('/:category/:id', ProductControllers.getSingleProductInCategory)

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
)

router.delete('/:id', auth(USER_ROLE.admin), ProductControllers.deleteProduct)

export const ProductRoutes = router
