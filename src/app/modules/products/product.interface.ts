export type TCategory =
  | 'Cardio'
  | 'Weightlifting Bars & Weights'
  | 'Strength Equipments'
  | 'Conditioning'
  | 'Body Weight & Gymnastics'
  | 'Straps Wraps & Support'
  | 'Fitness Accessories'
  | 'Yoga & Pilates'
  | 'Mats & Flooring'
  | 'Cross Training'
  | 'Equipment Packages'
  | 'Clearance'
  | 'BARBELLS'
  | 'RACKS & CAGES'
  | 'BENCHES'
  | 'FLOORING'
  | 'New Arrival'

export type TDiscountDurationUnit = 'Minutes' | 'Hours' | 'Days'

export type TProduct = {
  name: string
  price: number
  sku: string
  stockQuantity: number
  shortDescription: string
  longDescription: string
  images: string[]
  category: TCategory
  stockAvailability?: string
  discountPrice?: number | undefined
  discountPercentage?: number
  discountStartTime?: Date
  discountEndTime?: Date
  discountDuration?: number
  discountDurationUnit?: TDiscountDurationUnit
  advertise?: boolean
  isDeleted: boolean
}
