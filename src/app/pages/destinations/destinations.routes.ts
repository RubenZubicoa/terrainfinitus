import { Routes } from '@angular/router';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

const placeholder = (titleKey: string) => ({
  component: PlaceholderComponent,
  data: { titleKey },
});

export const destinationsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/destinations-landing/destinations-landing').then(
        (m) => m.DestinationsLanding,
      ),
  },
  { path: 'agua-dulce', ...placeholder('nav.freshwater') },
  { path: 'agua-salada', ...placeholder('nav.saltwater') },
  { path: 'aguas-calidas', ...placeholder('nav.warmwater') },
  { path: 'guias', ...placeholder('nav.guides') },
];
