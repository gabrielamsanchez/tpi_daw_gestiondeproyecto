import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClienteService } from '../../../clientes/cliente-api';
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
  private clienteService = inject(ClienteService);
  private cdr = inject(ChangeDetectorRef); 

  proyecto: Partial<Proyecto> = {
    nombre: '',
    idCliente: undefined
  };

  clientesDisponibles: any[] = [];

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: (response: any) => {
        this.clientesDisponibles = response.data ? response.data : response; 
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al cargar los clientes desde la BD', err);
      }
    });
  }

  formularioValido(): boolean {
    return !!this.proyecto.nombre && 
           this.proyecto.nombre.trim().length >= 5 && 
           this.proyecto.idCliente !== undefined && 
           this.proyecto.idCliente !== null;
  }

  guardar() {
    if (this.formularioValido()) {
      this.ref.close(this.proyecto); 
    }
  }

  cerrar() {
    this.ref.close(); 
  }
}