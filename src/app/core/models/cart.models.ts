import { Product } from '../../shared/models/product.models';

export interface CartLine {
  productId: string;
  quantity: number;
  /** Snapshot del producto (necesario para ítems de la API). */
  product: Product;
}

export interface CartItemView {
  product: Product;
  quantity: number;
  lineTotal: number;
}
