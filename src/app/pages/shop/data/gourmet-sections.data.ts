import { GourmetSection, GourmetSectionId } from '../../../shared/models/product.models';

export const GOURMET_SECTION_ORDER: readonly GourmetSectionId[] = [
  'aceites',
  'productos-pato',
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
  { id: 'aceites', translationKey: 'shop.gourmet.sections.aceites' },
  {
    id: 'productos-pato',
    translationKey: 'shop.gourmet.sections.productosPato',
    catalogUrl: '/documents/gourmet/catalogo-malvasia.pdf',
  },
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
