import { Routes } from '@angular/router';

export const shopRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/shop-landing/shop-landing').then((m) => m.ShopLanding),
  },
  {
    path: 'gourmet/:productId',
    loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  {
    path: 'gourmet',
    loadComponent: () => import('./pages/gourmet/gourmet').then((m) => m.Gourmet),
  },
  {
    path: 'merchandising/:productId',
    loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  {
    path: 'merchandising',
    loadComponent: () => import('./pages/merchandising/merchandising').then((m) => m.Merchandising),
  },
  {
    path: 'carrito',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
  },
];
