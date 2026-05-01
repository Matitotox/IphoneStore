export type Category = 'iphone' | 'mac' | 'audio'
export type Condition = 'sellado' | 'seminuevo' | 'usado'
export type StockStatus = 'disponible' | 'en_camino' | 'agotado'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  batteryPercentage: number | null
  category: Category
  condition: Condition
  stockStatus: StockStatus
}
