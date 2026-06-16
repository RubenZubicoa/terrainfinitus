import { Routes } from '@angular/router';

export const shopRoutes: Routes = [
  { path: '', redirectTo: 'gourmet', pathMatch: 'full' },
  {
    path: 'gourmet',
    loadComponent: () => import('./pages/gourmet/gourmet').then((m) => m.Gourmet),
  },
  {
    path: 'merchandising',
    loadComponent: () => import('./pages/merchandising/merchandising').then((m) => m.Merchandising),
  },
];
