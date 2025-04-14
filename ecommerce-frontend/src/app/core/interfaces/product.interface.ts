
export interface Product {
  product_id: number,
  name: string,
  brand: string,
  price: number,
  description: string,
  stock: number,
  category_id: number,
  category_name: string,
  image_url: string,
  is_disabled: boolean
}

export interface ProductInCart {
  product_id: number,
  name: string,
  brand: string,
  price: number,
  description: string,
  stock: number,
  category_id: number,
  category_name: string,
  image_url: string,
  is_disabled: boolean
  quantity: number
}