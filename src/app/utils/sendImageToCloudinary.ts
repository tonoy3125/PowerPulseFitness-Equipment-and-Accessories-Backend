/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import config from '../config'

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
})

// Multer storage configuration with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Set unique file name and folder in Cloudinary
    return {
      folder: 'products', // Folder in Cloudinary to store images
      public_id: `${file.fieldname}-${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}`, // Unique filename in Cloudinary
      resource_type: 'image', // Specify the resource type
    }
  },
})

// Create multer instance
export const upload = multer({
  storage: storage,
}).fields([
  { name: 'images', maxCount: 10 }, // Multiple images
  { name: 'image', maxCount: 1 }, // Single image
])

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    })
    return result.secure_url
  } catch (error) {
    throw new Error('Cloudinary upload failed')
  }
}
