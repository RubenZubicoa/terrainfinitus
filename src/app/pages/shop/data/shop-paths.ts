import { ProductCategory } from '../../../shared/models/product.models';

export const SHOP_BASE_PATH = '/tienda-boutique';

const CATEGORY_BASE_PATHS: Record<'gourmet' | 'merchandising', string> = {
  gourmet: `${SHOP_BASE_PATH}/gourmet`,
  merchandising: `${SHOP_BASE_PATH}/merchandising`,
};

const CART_CATEGORIES: readonly ProductCategory[] = ['gourmet', 'merchandising'];

export function isCartEligibleCategory(category: ProductCategory): boolean {
  return CART_CATEGORIES.includes(category);
}

export function getShopCategoryBasePath(category: ProductCategory): string {
  if (category === 'merchandising') {
    return CATEGORY_BASE_PATHS.merchandising;
  }
  return CATEGORY_BASE_PATHS.gourmet;
}

export function getProductDetailLink(category: ProductCategory, productId: string): string[] {
  return [getShopCategoryBasePath(category), productId];
}

export function getCategoryListingPath(
  category: ProductCategory,
  gourmetSection?: string,
): string {
  const base = getShopCategoryBasePath(category);
  if (category === 'gourmet' && gourmetSection) {
    return `${base}#${gourmetSection}`;
  }
  return base;
}

export function getCategoryTitleKey(category: ProductCategory): string {
  return category === 'merchandising' ? 'shop.merchandising.title' : 'shop.gourmet.title';
}

export function resolveCategoryFromUrl(url: string): 'gourmet' | 'merchandising' {
  return url.includes('/merchandising/') ? 'merchandising' : 'gourmet';
}

export const CART_CATEGORY_ORDER: readonly ProductCategory[] = CART_CATEGORIES;
