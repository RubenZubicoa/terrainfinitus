import { NavItem } from '../../../core/models/nav-item.model';
import { GourmetSection, GourmetSectionId } from '../../../shared/models/product.models';

export const DEFAULT_GOURMET_SECTION: GourmetSectionId = 'productos-pato';
export const GOURMET_BASE_ROUTE = '/tienda-boutique/gourmet';
export const MALVASIA_RECIPE_LIBRARY_URL = 'https://www.malvasia.com/es/recetas-pato/';

export const GOURMET_SECTION_ORDER: readonly GourmetSectionId[] = [
  'productos-pato',
  'aceites',
  'dulces-postres',
  'embutidos-jamones-cecinas',
  'mieles-mermeladas',
  'conservas',
  'caviar',
  'pastas',
  'condimentos-especias-sales',
  'galletas-panes',
  'bebidas-vinos-licores',
  'setas',
] as const;

export const GOURMET_SECTIONS: readonly GourmetSection[] = [
  {
    id: 'productos-pato',
    translationKey: 'shop.gourmet.sections.productosPato',
    catalogUrl: '/documents/gourmet/catalogo-malvasia.html',
    recipeLibraryUrl: MALVASIA_RECIPE_LIBRARY_URL,
  },
  { id: 'aceites', translationKey: 'shop.gourmet.sections.aceites' },
  { id: 'dulces-postres', translationKey: 'shop.gourmet.sections.dulcesPostres' },
  {
    id: 'embutidos-jamones-cecinas',
    translationKey: 'shop.gourmet.sections.embutidosJamonesCecinas',
  },
  { id: 'mieles-mermeladas', translationKey: 'shop.gourmet.sections.mielesMermeladas' },
  { id: 'conservas', translationKey: 'shop.gourmet.sections.conservas' },
  { id: 'caviar', translationKey: 'shop.gourmet.sections.caviar' },
  { id: 'pastas', translationKey: 'shop.gourmet.sections.pastas' },
  {
    id: 'condimentos-especias-sales',
    translationKey: 'shop.gourmet.sections.condimentosEspeciasSales',
  },
  { id: 'galletas-panes', translationKey: 'shop.gourmet.sections.galletasPanes' },
  { id: 'bebidas-vinos-licores', translationKey: 'shop.gourmet.sections.bebidasVinosLicores' },
  { id: 'setas', translationKey: 'shop.gourmet.sections.setas' },
];

export function getGourmetSectionById(id: GourmetSectionId): GourmetSection | undefined {
  return GOURMET_SECTIONS.find((section) => section.id === id);
}

export function buildGourmetNavigationChildren(): NavItem[] {
  return GOURMET_SECTIONS.map((section) => ({
    labelKey: `${section.translationKey}.title`,
    route: GOURMET_BASE_ROUTE,
    fragment: section.id,
  }));
}
