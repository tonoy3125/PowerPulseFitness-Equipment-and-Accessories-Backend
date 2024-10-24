import express from 'express'
import { AddressControllers } from './address.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', AddressControllers.createAddress)

router.get('/', auth('admin', 'user'), AddressControllers.getUserAddress)

router.put('/:id', AddressControllers.updateAddress)

router.delete('/:id', AddressControllers.deleteAddress)

export const AddressRoutes = router

