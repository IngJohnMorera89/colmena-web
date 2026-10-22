import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';
import { permisoGuard } from './core/permiso-guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión · Colmena',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'espacios',
    title: 'Espacios · Colmena',
    canActivate: [authGuard, permisoGuard('ESPACIOS_VER')],
    loadComponent: () => import('./pages/espacios/espacios').then(m => m.Espacios)
  },
  {
    path: 'miembros',
    title: 'Miembros · Colmena',
    canActivate: [authGuard, permisoGuard('USUARIOS_GESTIONAR')],
    loadComponent: () => import('./pages/miembros/miembros').then(m => m.Miembros)
  },
  {
    path: 'sin-acceso',
    title: 'Sin acceso · Colmena',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/sin-acceso/sin-acceso').then(m => m.SinAcceso)
  },
  { path: '', pathMatch: 'full', redirectTo: 'espacios' },
  { path: '**', redirectTo: 'espacios' }
];