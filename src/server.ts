import app from './app'
import config from './app/config'
import cron from 'node-cron'
import mongoose from 'mongoose'
import { ProductServices } from './app/modules/products/product.service'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    // Run every second to check for expired discounts
    cron.schedule('* * * * * *', async () => {
      // console.log('Checking and removing expired discounts...')
      await ProductServices.checkAndRemoveExpiredDiscounts()
      // console.log('Expired discounts checked and removed')
    })

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
