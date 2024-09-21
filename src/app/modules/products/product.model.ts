import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'
import { TCategoryTypes } from './product.constant'

const ProductSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: TCategoryTypes,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual field for stock availability
ProductSchema.virtual('stockAvailability').get(function () {
  return this.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'
})

export const Product = model<TProduct>('Product', ProductSchema)
