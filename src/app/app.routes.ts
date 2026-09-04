import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaceholderComponent } from './pages/placeholder/placeholder.component';
import { roomsRoutes } from './pages/rooms/rooms.routes';
import { Videos } from './pages/galery/videos/videos';
import { Images } from './pages/galery/images/images';
import { projectsRoutes } from './pages/projects/projects.routes';
import { aboutUsRoutes } from './pages/abaut-us/about-us.routes';
import { shopRoutes } from './pages/shop/shop.routes';
import { authRoutes } from './pages/auth/auth.routes';
import { destinationsRoutes } from './pages/destinations/destinations.routes';

const placeholder = (titleKey: string) => ({
  component: PlaceholderComponent,
  data: { titleKey },
});

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'quienes-somos', children: aboutUsRoutes },
      { path: 'proyectos', children: projectsRoutes },
      { path: 'habitaciones', children: roomsRoutes },
      { path: 'gastronomia/presentacion', ...placeholder('nav.presentation') },
      { path: 'gastronomia/cartas', ...placeholder('nav.menus') },
      { path: 'actividades', ...placeholder('nav.activities') },
      { path: 'tienda-boutique', children: shopRoutes },
      { path: 'galeria/fotos', redirectTo: 'galeria/fotos/proyectos', pathMatch: 'full' },
      { path: 'galeria/fotos/proyectos', component: Images },
      { path: 'galeria/fotos/naturaleza', component: Images },
      { path: 'galeria/fotos/pesca', component: Images },
      { path: 'galeria/videos', redirectTo: 'galeria/videos/proyectos', pathMatch: 'full' },
      { path: 'galeria/videos/proyectos', component: Videos },
      { path: 'galeria/videos/naturaleza', component: Videos },
      { path: 'galeria/videos/pesca', component: Videos },
      { path: 'blog', ...placeholder('nav.blog') },
      { path: 'destinations', children: destinationsRoutes },
      { path: 'testimonios', ...placeholder('nav.testimonials') },
      { path: 'reservas-precios', ...placeholder('nav.bookings') },
      { path: 'contacto', ...placeholder('nav.contact') },
      { path: 'login', children: authRoutes },
    ],
  },
  { path: '**', redirectTo: '' },
];
