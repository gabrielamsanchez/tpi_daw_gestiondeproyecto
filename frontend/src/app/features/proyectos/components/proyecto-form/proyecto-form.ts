import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { Proyecto } from '../../../../shared/interfaces/proyecto';

@Component({
  selector: 'app-proyecto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, SelectModule],
  templateUrl: './proyecto-form.html',
  styleUrls: ['./proyecto-form.css'] 
})
export class ProyectoForm implements OnInit {
  ref = inject(DynamicDialogRef);

  proyecto: Partial<Proyecto> = {
    nombre: '',
    idCliente: undefined
  };

  clientesDisponibles: any[] = [];

  ngOnInit() {
    this.clientesDisponibles = [
      { id: 1, nombre: 'Agencia Zesty' },
      { id: 2, nombre: 'Gobierno de Córdoba' },
      { id: 3, nombre: 'Universidad Nacional' }
    ];
  }

  guardar() {
    if (this.proyecto.nombre) {
      this.ref.close(this.proyecto); 
    }
  }

  cerrar() {
    this.ref.close(); 
  }
}