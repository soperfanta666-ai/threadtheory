export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
export type Color = string

export interface SizePrice {
  size: Size
  price: number
  stock: number | null
}

export interface Product {
  id: string
  name: string
  basePrice: number
  originalPrice: number
  category: string
  images: string[]
  sizePrices: SizePrice[]
  colors: Array<{
    name: string
    hex: string
  }>
  description: string
  outOfStockMessage?: string
}

export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  price: number
  size: Size
  color: string
  colorHex: string
  quantity: number
  stock: number | null
}

export interface CheckoutInfo {
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
}