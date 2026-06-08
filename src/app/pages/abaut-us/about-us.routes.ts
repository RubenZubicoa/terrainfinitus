import { Routes } from "@angular/router";

export const aboutUsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/about-us/about-us').then(m => m.AboutUs),
  }
]