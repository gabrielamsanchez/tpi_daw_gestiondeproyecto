import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  
  // Esto actúa como tu "Base de Datos" temporal en memoria
  private baseDeDatosFicticia = [
    { id: 1, nombre: 'Rediseño Web', cliente: 'TechCorp' },
    { id: 2, nombre: 'App Móvil iOS', cliente: 'StartUp Inc' }
  ];

  constructor() { }

  // 1. Simula el POST (Crear un proyecto)
  crearProyecto(proyecto: any): Observable<any> {
    // Le inventamos un ID único basado en la fecha actual
    const nuevoProyecto = { ...proyecto, id: new Date().getTime() };
    
    // Lo guardamos en nuestro array temporal
    this.baseDeDatosFicticia.push(nuevoProyecto);

    // Simulamos que el servidor responde con éxito después de 1 segundo (1000ms)
    return of({ 
      status: 201, 
      mensaje: 'Proyecto creado exitosamente en el Mock', 
      data: nuevoProyecto 
    }).pipe(delay(1000)); 
  }

  // 2. Simula el GET (Traer todos los proyectos - te servirá para tu tabla después)
  obtenerProyectos(): Observable<any[]> {
    return of(this.baseDeDatosFicticia).pipe(delay(800));
  }
}