/* eslint-disable @typescript-eslint/no-unused-vars */
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
    try {
      // Parse form-data body sent as JSON
      req.body = JSON.parse(req?.body?.data)
      next()
    } catch (error) {
      next(error)
    }
  },
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
)

router.get('/', ProductControllers.getAllProduct)

router.get('/discounts', ProductControllers.getDiscountedProducts)
router.get('/advertise', ProductControllers.getAllAdvertiseDiscountProduct)

router.get('/category-count', ProductControllers.getCategoryProductCounts)

router.get('/stock-count', ProductControllers.getTotalCountStockAndOutOfStock)

router.get('/:id', ProductControllers.getSingleProduct)

router.get('/category/:category', ProductControllers.getSingleCategory)

router.get('/:category/:id', ProductControllers.getSingleProductInCategory)

router.get('/category-count', ProductControllers.getCategoryProductCounts)

// router.get('/advertise', ProductControllers.getAllAdvertiseDiscountProduct)

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  upload, // Multer middleware for file upload
  (req: Request, res: Response, next: NextFunction) => {
    // Check if req.body.data exists before parsing
    if (req?.body?.data) {
      try {
        req.body = JSON.parse(req?.body?.data)
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON input in the 'data' field",
          errorMessages: [{ path: '', message: 'Invalid JSON input' }],
        })
      }
    }
    console.log(req?.body)
    next()
  },
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
)

router.patch(
  '/discount',
  auth(USER_ROLE.admin), // Ensure only admin can update discounts
  // validateRequest(ProductValidations.updateDiscountValidationSchema),
  ProductControllers.updateDiscount, // Call the controller function
)

router.post(
  '/discounts/remove-expired',
  auth(USER_ROLE.admin), // Ensure only admin can trigger this operation
  ProductControllers.removeExpiredDiscounts, // Controller function to remove expired discounts
)

router.patch(
  '/remove-discount/:id',
  auth('admin'),
  ProductControllers.removeDiscountById,
)

router.delete('/:id', auth(USER_ROLE.admin), ProductControllers.deleteProduct)

router.patch(
  '/advertise/:id',
  auth('admin'),
  ProductControllers.addAdvertiseDiscountById,
)
router.patch(
  '/remove-advertise/:id',
  auth('admin'),
  ProductControllers.removeAdvertiseDiscountById,
)

export const ProductRoutes = router
