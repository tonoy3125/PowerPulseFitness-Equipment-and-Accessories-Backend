import express from 'express'
import { AddressControllers } from './address.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', AddressControllers.createAddress)

router.get('/', auth('admin', 'user'), AddressControllers.getUserAddress)

export const AddressRoutes = router
