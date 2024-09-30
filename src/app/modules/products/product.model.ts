import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'
import { TCategoryTypes, TDiscountDurationUnitTypes } from './product.constant'

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
      required: false,
    },
    longDescription: {
      type: String,
      required: false,
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
    discountPrice: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    discountStartTime: {
      type: Date,
    },
    discountEndTime: {
      type: Date,
    },
    discountDuration: {
      type: Number,
    },
    discountDurationUnit: {
      type: String,
      enum: TDiscountDurationUnitTypes,
    },
    advertise: {
      type: Boolean,
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
