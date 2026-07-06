import { Product } from '../../shared/models/product.models';

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartItemView {
  product: Product;
  quantity: number;
  lineTotal: number;
}
