import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProyectoForm } from '../../features/proyectos/components/proyecto-form/proyecto-form';
import { TareaForm } from '../../features/tareas/components/tarea-form/tarea-form'; // Ajusta tu ruta
import { Cliente } from '../../features/clientes/pages/cliente/cliente';
import { ClienteForm } from '../../features/clientes/pages/cliente-form/cliente-form';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private dialogService: DialogService) {}

  openNuevoProyecto(): DynamicDialogRef | null {
    return this.dialogService.open(ProyectoForm, {
    header: ' ',
    width: '400px',
    contentStyle: { overflow: 'auto', 'border-radius': '20px' },
    baseZIndex: 10000,
    styleClass: 'custom-modal-v2',
    maskStyleClass: 'dialog-mask-blur'
    });
  }

  // Nuevo método para la Tarea
  openNuevaTarea(): DynamicDialogRef | null {
    return this.dialogService.open(TareaForm, {
      header: ' ',
      width: '450px',
      contentStyle: { overflow: 'visible' },
      baseZIndex: 10000,
      styleClass: 'custom-modal-v2',
      maskStyleClass: 'dialog-mask-blur'
    });
  }

   openNuevoCliente(): DynamicDialogRef | null {
    return this.dialogService.open(ClienteForm, {
      header: 'Nuevo Cliente',
      width: '450px',
      contentStyle: { overflow: 'visible' },
      baseZIndex: 10000,
      maskStyleClass: 'dialog-mask-blur'
    });
  }


}
