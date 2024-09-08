export type TCategory =
  | 'Cardio'
  | 'Weightlifting Bars & Weights'
  | 'Strength Equipments'
  | 'Conditioning'
  | 'Body Weight & Gymnastics'
  | 'Straps, Wraps & Support'
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

export type TProduct = {
  name: string
  price: number
  sku: string
  stockQuantity: number
  description: string
  images: string[]
  category: TCategory
  isDeleted: boolean
}
