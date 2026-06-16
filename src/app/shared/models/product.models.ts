export type ProductCategory = 'gourmet' | 'merchandising' | 'the-lake';

export interface Product {
  id: string;
  category: ProductCategory;
  nameKey: string;
  descriptionKey: string;
  image: string;
  price: number;
}
