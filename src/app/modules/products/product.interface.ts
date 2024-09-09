export type TCategory =
  | 'Cardio'
  | 'Weightlifting Bars And Weights'
  | 'Strength Equipments'
  | 'Conditioning'
  | 'Body Weight And Gymnastics'
  | 'Straps Wraps And Support'
  | 'Fitness Accessories'
  | 'Yoga And Pilates'
  | 'Mats And Flooring'
  | 'Cross Training'
  | 'Equipment Packages'
  | 'Clearance'
  | 'BARBELLS'
  | 'RACKS And CAGES'
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
