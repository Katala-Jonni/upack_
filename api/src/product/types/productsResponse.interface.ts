import { Product } from '@app/product/product.schema';

export interface ProductsResponseInterface {
  products: Product[],
  productsCount: number
}
