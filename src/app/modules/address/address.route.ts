import express from 'express'
import { AddressControllers } from './address.controller'

const router = express.Router()

router.post('/', AddressControllers.createAddress)


export const AddressRoutes = router
