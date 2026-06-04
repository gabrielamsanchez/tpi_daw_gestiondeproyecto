import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProyectoService } from '../../../proyectos/services/proyecto'; 

@Component({
  selector: 'app-tarea-form',
  standalone: true, 
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, SelectModule],
  templateUrl: './tarea-form.html',
  styleUrls: ['./tarea-form.css'] 
})
export class TareaForm implements OnInit {

  tarea = {
    titulo: '',
    proyectoId: null
  };

  proyectosDisponibles: any[] = [];
  private proyectoService = inject(ProyectoService);

  constructor(public ref: DynamicDialogRef) {}
  ngOnInit() {
    this.proyectoService.obtenerProyectos(1, 100).subscribe({
      next: (response) => {
        this.proyectosDisponibles = response.data;
      },
      error: (err) => {
        console.error('Error al cargar proyectos desde la BD', err);
      }
    });
  }

  guardar() {
    if (this.tarea.titulo && this.tarea.proyectoId) {
      this.ref.close(this.tarea); 
    }
  }

  cerrar() {
    this.ref.close(); 
  }
}