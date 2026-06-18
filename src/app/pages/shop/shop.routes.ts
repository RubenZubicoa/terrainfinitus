import { Routes } from '@angular/router';

export const shopRoutes: Routes = [
  { path: '', redirectTo: 'gourmet', pathMatch: 'full' },
  {
    path: 'gourmet/:productId',
    loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  {
    path: 'gourmet',
    loadComponent: () => import('./pages/gourmet/gourmet').then((m) => m.Gourmet),
  },
  {
    path: 'merchandising',
    loadComponent: () => import('./pages/merchandising/merchandising').then((m) => m.Merchandising),
  },
];
