import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/resorts-landing/resorts-landing').then((m) => m.ResortsLanding),
  },
  {
    path: 'la-idea',
    loadComponent: () => import('./pages/idea/idea').then((m) => m.Idea),
  },
  {
    path: 'terra-peralejos',
    loadComponent: () => import('./pages/resort/resort').then((m) => m.Resort),
    data: { resortId: 'peralejos' },
  },
  {
    path: 'terra-bugarra',
    loadComponent: () => import('./pages/resort/resort').then((m) => m.Resort),
    data: { resortId: 'bugarra' },
  },
  {
    path: 'the-lake',
    loadComponent: () => import('./pages/resort/resort').then((m) => m.Resort),
    data: { resortId: 'the-lake' },
  },
];
