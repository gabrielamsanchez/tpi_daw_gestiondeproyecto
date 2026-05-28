import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Home } from './features/dashboard/pages/home/home';
import { Cliente } from './features/clientes/pages/cliente/cliente';
import { Layout } from './shared/components/layout/layout';

export const routes: Routes = [
     {
        path: "login",
        component: Login
    },
    {
    path: '',
    component: Layout, // Este componente tiene el Sidebar y un router-outlet interno
    // canActivate: [authGuard], <-- Aquí pondremos el candado de seguridad luego
    children: [
      {
        path: 'dashboard',
        component: Home
      },
      // { path: 'proyectos', component: ProyectosComponent },
      // { path: 'tareas', component: TareasComponent },
      {
      path: "clientes",
      component: Cliente
      },
      // Si entran a la raíz sin ruta, los mandamos al dashboard

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // RUTA COMODÍN (Si tipean cualquier cosa, los mandamos al login o a un 404)
  { path: '**', redirectTo: 'login' }


];
