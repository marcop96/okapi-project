export interface Product {
  SKU: number
  title: string
  weight: string
  quantity?: number
}

export interface ProductToExport {
  SKU: number
  quantity?: number
}
