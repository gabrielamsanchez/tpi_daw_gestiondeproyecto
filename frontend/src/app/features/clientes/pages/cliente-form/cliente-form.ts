import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cliente-form',
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, SelectModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})

export class ClienteForm implements OnInit {

  // Objeto base que mapea con los campos de tu listado principal
  cliente = {
    nombre: '',
    estado: 'Activo', // Valor por defecto
    telefono: '',
    correo: ''
  };

  estadosDisponibles: string[] = [];

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {
    this.estadosDisponibles = ['Activo', 'Inactivo'];
  }

  guardar() {
    // Validación simple: obligamos a que ponga mínimo el nombre
    if (this.cliente.nombre.trim()) {
      this.ref.close(this.cliente); // Enviamos los datos de vuelta a la tabla
    }
  }

  cerrar() {
    this.ref.close(); // Cierra el modal sin mandar datos
  }
}
