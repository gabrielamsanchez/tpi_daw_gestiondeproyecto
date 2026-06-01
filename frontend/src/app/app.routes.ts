import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Home } from './features/dashboard/pages/home/home';
import { Cliente } from './features/clientes/pages/cliente/cliente';
import { Layout } from './shared/components/layout/layout';
import { authGuard } from './core/guards/auth-guard';

import { Usuarios } from './features/usuarios/usuarios';
import { Tareas } from './features/tareas/pages/tarea-list/tarea-list';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
    path: '',
    component: Layout, // Sidebar y un router-outlet 
      canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Home
      },
      {
      path: "clientes",
      component: Cliente
      },
      { path: "usuarios",
      component: Usuarios
      },
      { path: "tareas",
      component: Tareas
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' },
   
    
];
