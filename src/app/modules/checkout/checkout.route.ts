import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CheckoutValidations } from './checkout.validation'
import { CheckoutControllers } from './checkout.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/',
  validateRequest(CheckoutValidations.createCheckoutValidationSchema),
  CheckoutControllers.createCheckOut,
)

router.get('/', auth('admin'), CheckoutControllers.getAllOrder)

router.get(
  '/user-order',
  auth('admin', 'user'),
  CheckoutControllers.getUserOrderItems,
)

router.get('/:id', CheckoutControllers.getSingleCheckoutByOrderId)
router.patch(
  '/status/:id',
  auth('admin'),
  CheckoutControllers.updateOrderStatus,
)

router.delete('/:id', auth('admin'), CheckoutControllers.deleteOrder)

export const CheckoutRoutes = router
