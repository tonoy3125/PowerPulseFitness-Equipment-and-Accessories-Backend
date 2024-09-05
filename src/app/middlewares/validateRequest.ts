import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import catchAsync from '../utils/catchAsync'

const validateRequest = (schema: ZodSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    })
    next()
  })
}

export default validateRequest
