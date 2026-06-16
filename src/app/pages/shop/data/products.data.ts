import { Product, ProductCategory } from '../../../shared/models/product.models';

export const GOURMET_PRODUCTS: Product[] = [
  {
    id: 'gourmet-olive-oil',
    category: 'gourmet',
    nameKey: 'shop.products.gourmet.oliveOil.name',
    descriptionKey: 'shop.products.gourmet.oliveOil.description',
    image: '/images/inicio/inicio1.jpg',
    price: 28,
  },
  {
    id: 'gourmet-honey',
    category: 'gourmet',
    nameKey: 'shop.products.gourmet.honey.name',
    descriptionKey: 'shop.products.gourmet.honey.description',
    image: '/images/inicio/inicio5.jpg',
    price: 18,
  },
  {
    id: 'gourmet-wine',
    category: 'gourmet',
    nameKey: 'shop.products.gourmet.wine.name',
    descriptionKey: 'shop.products.gourmet.wine.description',
    image: '/images/inicio/inicio7.jpg',
    price: 42,
  },
  {
    id: 'gourmet-preserves',
    category: 'gourmet',
    nameKey: 'shop.products.gourmet.preserves.name',
    descriptionKey: 'shop.products.gourmet.preserves.description',
    image: '/images/inicio/inicio3.jpg',
    price: 14,
  },
  {
    id: 'gourmet-cheese',
    category: 'gourmet',
    nameKey: 'shop.products.gourmet.cheese.name',
    descriptionKey: 'shop.products.gourmet.cheese.description',
    image: '/images/inicio/inicio6.jpg',
    price: 24,
  },
  {
    id: 'gourmet-ham',
    category: 'gourmet',
    nameKey: 'shop.products.gourmet.ham.name',
    descriptionKey: 'shop.products.gourmet.ham.description',
    image: '/images/inicio/inicio8.jpg',
    price: 36,
  },
];

export const MERCHANDISING_PRODUCTS: Product[] = [
  {
    id: 'merch-tshirt',
    category: 'merchandising',
    nameKey: 'shop.products.merchandising.tshirt.name',
    descriptionKey: 'shop.products.merchandising.tshirt.description',
    image: '/images/inicio/inicio9.jpg',
    price: 45,
  },
  {
    id: 'merch-cap',
    category: 'merchandising',
    nameKey: 'shop.products.merchandising.cap.name',
    descriptionKey: 'shop.products.merchandising.cap.description',
    image: '/images/inicio/inicio10.jpg',
    price: 32,
  },
  {
    id: 'merch-tote',
    category: 'merchandising',
    nameKey: 'shop.products.merchandising.tote.name',
    descriptionKey: 'shop.products.merchandising.tote.description',
    image: '/images/inicio/inicio11.jpg',
    price: 38,
  },
  {
    id: 'merch-mug',
    category: 'merchandising',
    nameKey: 'shop.products.merchandising.mug.name',
    descriptionKey: 'shop.products.merchandising.mug.description',
    image: '/images/inicio/inicio12.jpg',
    price: 22,
  },
  {
    id: 'merch-towel',
    category: 'merchandising',
    nameKey: 'shop.products.merchandising.towel.name',
    descriptionKey: 'shop.products.merchandising.towel.description',
    image: '/images/inicio/inicio14.jpg',
    price: 55,
  },
  {
    id: 'merch-scarf',
    category: 'merchandising',
    nameKey: 'shop.products.merchandising.scarf.name',
    descriptionKey: 'shop.products.merchandising.scarf.description',
    image: '/images/inicio/inicio15.jpg',
    price: 68,
  },
];

const ALL_PRODUCTS: Product[] = [...GOURMET_PRODUCTS, ...MERCHANDISING_PRODUCTS];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return ALL_PRODUCTS.filter((product) => product.category === category);
}
