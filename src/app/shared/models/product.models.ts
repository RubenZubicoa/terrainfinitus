export type ProductCategory = 'gourmet' | 'merchandising' | 'the-lake';

export type GourmetSectionId =
  | 'aceites'
  | 'productos-pato'
  | 'dulces-postres'
  | 'embutidos-jamones-cecinas'
  | 'mieles-mermeladas'
  | 'conservas'
  | 'caviar'
  | 'pastas'
  | 'condimentos-especias-sales'
  | 'galletas-panes'
  | 'bebidas-vinos-licores'
  | 'setas';

export interface GourmetSection {
  id: GourmetSectionId;
  translationKey: string;
  catalogUrl?: string;
  recipeLibraryUrl?: string;
  presentationVideoUrl?: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  gourmetSection?: GourmetSectionId;
  nameKey: string;
  descriptionKey: string;
  image: string;
  price: number;
}
