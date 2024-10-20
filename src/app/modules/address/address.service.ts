import { TAddress } from './address.interface'
import { Address } from './address.model'

const createAddressIntoDB = async (payload: TAddress) => {
  // If the new address should be the default
  if (payload.isDefault) {
    // Find and update the existing default address
    await Address.updateOne(
      { userId: payload.userId, isDefault: true },
      { isDefault: false },
    )
  }

  // Create and save the new address
  const result = await Address.create(payload)
  return result
}

const getUserAddressFromDB = async (userId: string) => {
  const result = await Address.find({ userId }).populate('userId')
  return result
}

const updateAddressIntoDB = async (id: string, payload: Partial<TAddress>) => {
  const result = await Address.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteAddressFromDB = async (id: string) => {
  const result = await Address.findByIdAndDelete(id)
  return result
}

export const AddressServices = {
  createAddressIntoDB,
  getUserAddressFromDB,
  updateAddressIntoDB,
  deleteAddressFromDB,
}
