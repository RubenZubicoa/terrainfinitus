import { NavItem } from '../models/nav-item.model';
import { buildGourmetNavigationChildren } from '../../pages/shop/data/gourmet-sections.data';
import { buildResortsNavigationChildren } from '../../pages/projects/data/project-sections.data';

export const MAIN_NAVIGATION: NavItem[] = [
  { labelKey: 'nav.home', route: '/' },
  { labelKey: 'nav.about', route: '/quienes-somos' },
  {
    labelKey: 'nav.resorts',
    children: buildResortsNavigationChildren(),
  },
  { labelKey: 'nav.rooms', route: '/habitaciones' },
  {
    labelKey: 'nav.gastronomy',
    children: [
      { labelKey: 'nav.presentation', route: '/gastronomia/presentacion' },
      { labelKey: 'nav.menus', route: '/gastronomia/cartas' },
    ],
  },
  { labelKey: 'nav.activities', route: '/actividades' },
  {
    labelKey: 'nav.shop',
    route: '/tienda-boutique',
    children: [
      {
        labelKey: 'nav.shopGourmet',
        route: '/tienda-boutique/gourmet',
        children: buildGourmetNavigationChildren(),
      },
      { labelKey: 'nav.shopMerchandising', route: '/tienda-boutique/merchandising' },
      {
        labelKey: 'nav.shopTheLake',
        externalUrl: 'https://tienda-pesca-tau.vercel.app/',
        openInNewTab: true,
      },
    ],
  },
  {
    labelKey: 'nav.photoGallery',
    children: [
      { labelKey: 'nav.galleryProjects', route: '/galeria/fotos/proyectos' },
      { labelKey: 'nav.galleryNature', route: '/galeria/fotos/naturaleza' },
      { labelKey: 'nav.galleryFishing', route: '/galeria/fotos/pesca' },
    ],
  },
  {
    labelKey: 'nav.videoGallery',
    children: [
      { labelKey: 'nav.galleryProjects', route: '/galeria/videos/proyectos' },
      { labelKey: 'nav.galleryNature', route: '/galeria/videos/naturaleza' },
      { labelKey: 'nav.galleryFishing', route: '/galeria/videos/pesca' },
    ],
  },
  { labelKey: 'nav.blog', route: '/blog' },
  {
    labelKey: 'nav.destinations',
    route: '/destinations',
    children: [
      { labelKey: 'nav.freshwater', route: '/destinations/agua-dulce' },
      { labelKey: 'nav.saltwater', route: '/destinations/agua-salada' },
      { labelKey: 'nav.warmwater', route: '/destinations/aguas-calidas' },
      { labelKey: 'nav.guides', route: '/destinations/guias' },
    ],
  },
  { labelKey: 'nav.testimonials', route: '/testimonios' },
  { labelKey: 'nav.bookings', route: '/reservas-precios' },
];
