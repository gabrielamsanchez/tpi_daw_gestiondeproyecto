// import { RenderMode, ServerRoute } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '**',
//     renderMode: RenderMode.Prerender
//   }
// ];
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Si tenés una pantalla pública de login, esta es la única que vale la pena pre-renderizar
    path: 'login', 
    renderMode: RenderMode.Prerender
  },
  {
    // Para TODO el resto de tu sistema privado (dashboard, usuarios, proyectos, tareas...)
    // RenderMode.Client fuerza a que el HTML se dibuje en el navegador de la persona
    // DESPUÉS de que se valide su token, evitando que el build haga peticiones a lo ciego.
    path: '**',
    renderMode: RenderMode.Client
  }
];