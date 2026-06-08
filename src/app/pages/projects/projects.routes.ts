import { Routes } from "@angular/router";

export const projectsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/projects/projects').then(m => m.Projects),
  },
  {
    path: 'la-idea',
    loadComponent: () => import('./pages/idea/idea').then(m => m.Idea),
  },
  {
    path: 'terra-peralejos',
    loadComponent: () => import('./pages/peralejos/peralejos').then(m => m.Peralejos),
  },
  {
    path: 'terra-bugarra',
    loadComponent: () => import('./pages/bugarra/bugarra').then(m => m.Bugarra),
  },
  {
    path: 'the-lake',
    loadComponent: () => import('./pages/the-lake/the-lake').then(m => m.TheLake),
  },
];