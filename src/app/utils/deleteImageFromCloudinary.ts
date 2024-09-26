import cloudinary from 'cloudinary'

export const deleteImageFromCloudinary = async (publicId: string) => {
  return cloudinary.v2.uploader.destroy(publicId, function (error, result) {
    if (error) {
      throw new Error('Failed to delete image from Cloudinary')
    }
    return result
  })
}
