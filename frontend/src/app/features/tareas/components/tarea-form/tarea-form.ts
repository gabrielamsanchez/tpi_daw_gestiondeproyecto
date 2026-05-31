import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select'
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tarea-form',
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

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {
    this.proyectosDisponibles = [
      { id: 1, nombre: 'Rediseño Web' },
      { id: 2, nombre: 'App Móvil iOS' },
      { id: 3, nombre: 'Migración Base de Datos' }
    ];
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
