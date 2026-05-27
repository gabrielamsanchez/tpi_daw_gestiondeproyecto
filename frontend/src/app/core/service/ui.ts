import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProyectoForm } from '../../features/proyectos/components/proyecto-form/proyecto-form';
import { TareaForm } from '../../features/tareas/components/tarea-form/tarea-form'; // Ajusta tu ruta

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private dialogService: DialogService) {}

  openNuevoProyecto(): DynamicDialogRef | null {
    return this.dialogService.open(ProyectoForm, {
    header: ' ', // Dejamos el header vacío para usar el título interno
    width: '400px',
    contentStyle: { overflow: 'auto', 'border-radius': '20px' },
    baseZIndex: 10000,
    styleClass: 'custom-modal-v2', // Clase para el diseño premium
    maskStyleClass: 'dialog-mask-blur'
    });
  }

  // Nuevo método para la Tarea
  openNuevaTarea(): DynamicDialogRef | null {
    return this.dialogService.open(TareaForm, {
      header: 'Nueva Tarea',
      width: '450px',
      contentStyle: { overflow: 'visible' }, // 'visible' ayuda con los dropdowns
      baseZIndex: 10000,
      maskStyleClass: 'dialog-mask-blur'
    });
  }


}