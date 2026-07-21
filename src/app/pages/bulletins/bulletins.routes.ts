import { Routes } from '@angular/router';
import { Bulletins } from './pages/bulletins/bulletins';
import { Unsubscribe } from './pages/unsubscribe/unsubscribe';

export const bulletinsRoutes: Routes = [
  { path: '', component: Bulletins },
  { path: 'baja', component: Unsubscribe },
];
