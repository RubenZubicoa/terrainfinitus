import { NavItem } from '../models/nav-item.model';

export const MAIN_NAVIGATION: NavItem[] = [
  { labelKey: 'nav.home', route: '/' },
  { labelKey: 'nav.about', route: '/quienes-somos' },
  {
    labelKey: 'nav.projects',
    children: [
      { labelKey: 'nav.idea', route: '/proyectos/la-idea' },
      { labelKey: 'nav.peralejos', route: '/proyectos/terra-peralejos' },
      { labelKey: 'nav.bugarra', route: '/proyectos/terra-bugarra' },
      { labelKey: 'nav.theLake', route: '/proyectos/the-lake' },
    ],
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
    children: [
      { labelKey: 'nav.shopGourmet', route: '/tienda-boutique/gourmet' },
      { labelKey: 'nav.shopMerchandising', route: '/tienda-boutique/merchandising' },
      { labelKey: 'nav.shopTheLake', route: '/tienda-boutique/the-lake' },
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
    children: [
      { labelKey: 'nav.freshwater', route: '/destinations/agua-dulce' },
      { labelKey: 'nav.saltwater', route: '/destinations/agua-salada' },
      { labelKey: 'nav.guides', route: '/destinations/guias' },
    ],
  },
  { labelKey: 'nav.testimonials', route: '/testimonios' },
  { labelKey: 'nav.bookings', route: '/reservas-precios' },
];
