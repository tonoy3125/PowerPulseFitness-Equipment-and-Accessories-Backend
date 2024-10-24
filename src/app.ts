import express, { Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import NotFound from './app/errors/notFound'
import { routes } from './app/routes'
import Stripe from 'stripe'
import config from './app/config'

const app: Application = express()
// const port = 3000

export const stripe = new Stripe(config.stripe_secret_key as string)

// parser
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      // 'http://localhost:5173',
      'https://power-pulse-fitness-equipment-and-accessories-frontend.vercel.app',
    ],
    credentials: true,
  }),
)

// Application Routes
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send({
    message: 'Wellcome to PowerPulse Fitness Backend',
  })
})

app.use(globalErrorHandler)

// Not found
app.use(NotFound)

export default app
