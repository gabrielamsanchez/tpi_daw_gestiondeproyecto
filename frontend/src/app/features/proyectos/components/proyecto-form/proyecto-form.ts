
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-proyecto-form',
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './proyecto-form.html',
  styleUrls: ['./proyecto-form.css']
})
export class ProyectoForm {
  proyecto = {
    nombre: '',
    cliente: ''
  };

  // Inyectamos DynamicDialogRef para poder cerrar el modal
  constructor(public ref: DynamicDialogRef) {}

  cerrar() {
    this.ref.close();
  }

  guardar() {
    if (this.proyecto.nombre && this.proyecto.cliente) {
      // Cerramos el modal devolviendo el objeto proyecto
      this.ref.close(this.proyecto);
    }
  }
}