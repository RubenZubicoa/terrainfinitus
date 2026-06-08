import { Routes } from '@angular/router';

export const roomsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/rooms/rooms').then((m) => m.Rooms),
  },
  {
    path: ':roomId',
    loadComponent: () => import('./pages/room-detail/room-detail').then((m) => m.RoomDetail),
  },
];
