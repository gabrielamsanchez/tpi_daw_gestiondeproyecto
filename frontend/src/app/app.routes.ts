import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Home } from './features/dashboard/pages/home/home';
import { Usuarios } from './features/usuarios/usuarios';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    { path: "dashboard",
      component: Home
    },
    { path: "usuarios",
      component: Usuarios
    }
];
