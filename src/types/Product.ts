export interface Product {
  SKU: number
  title: string
  weight: string
  quantity?: number
}

export interface ProductToExport {
  sku: number
  quantity?: number
}
