import httpStatus from 'http-status'
import { stripe } from '../../../app'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

export const createStripePaymentIntent = catchAsync(async (req, res) => {
  const { total } = req.body
  const payAmount = Number(total) * 100

  const paymentIntent = await stripe.paymentIntents.create({
    amount: payAmount,
    currency: 'usd',
    payment_method_types: ['card'],
  })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment Created Successfully',
    data: paymentIntent.client_secret,
  })
})
