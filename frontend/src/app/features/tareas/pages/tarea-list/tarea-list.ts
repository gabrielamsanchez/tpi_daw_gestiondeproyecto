import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SelectItem, MessageService } from 'primeng/api';
import { Back } from '../../../../shared/components/back/back';
import { UiService } from '../../../../core/service/ui';
import { TareaInterface } from '../../../../shared/interfaces/tarea';


@Component({
    selector: 'app-tareas-tabla',
    standalone: true,
    imports: [
        CommonModule,
        SelectModule, 
        TableModule, 
        TagModule, 
        ToastModule, 
        ButtonModule, 
        InputTextModule, 
        RippleModule, 
        FormsModule, 
        Back,
    ],
    templateUrl: './tarea-list.html',
    styleUrls: ['./tarea-list.css'],
    providers: [MessageService] 
})
export class Tareas implements OnInit {
    private messageService = inject(MessageService);
    private uiService = inject(UiService); 
    
    infoProyecto = {
        nombre: 'Desarrollo Web DAW',
        estado: 'En Progreso',
        cliente: 'Nombre Cliente S.A.'
    };
    
    tareas: any[] = [];
    statuses!: SelectItem[];
    cols: any[] = [];
    clonedTareas: { [s: string]: TareaInterface } = {};

    ngOnInit() {
        this.tareas = [
            { id: '1', nombreTarea: 'Diseño de Interfaces', estado: 'PENDIENTE' },
            { id: '2', nombreTarea: 'Configuración de Base de Datos', estado: 'FINALIZADA' },
            { id: '3', nombreTarea: 'Pruebas Unitarias', estado: 'BAJA' }
        ];

        this.cols = [
            { field: 'nombreTarea', header: 'Nombre Tarea' },
            { field: 'estado', header: 'Estado' }
        ];

        this.statuses = [
            { label: 'Planificado', value: 'PENDIENTE' },
            { label: 'En Progreso', value: 'FINALIZADA' },
            { label: 'Completado', value: 'BAJA' }
        ];
    }

    onRowEditInit(tarea: TareaInterface) {
        this.clonedTareas[tarea.id as string] = { ...tarea };
    }

    onRowEditSave(tarea: TareaInterface) {
        if (tarea.nombreTarea && tarea.nombreTarea.trim().length > 0) {
            delete this.clonedTareas[tarea.id as string];
            
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Éxito', 
                detail: 'Tarea actualizada con éxito de forma local' 
            });
        } else {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'El nombre de la tarea no puede quedar vacío' 
            });
        }
    }

    onRowEditCancel(tarea: TareaInterface, index: number) {
        this.tareas[index] = this.clonedTareas[tarea.id as string];
        delete this.clonedTareas[tarea.id as string];
    }

    getSeverity(status: string) {
        switch (status) {
            case 'PENDIENTE': return 'success';
            case 'FINALIZADA': return 'warn';
            case 'BAJA': return 'danger';
            default: return 'secondary';
        }
    }

    getLabelEstado(status: string): string {
        const found = this.statuses.find(s => s.value === status);
        return found?.label ?? status;
    }

   
    crearNuevaTarea() {
        const ref = this.uiService.openNuevaTarea();

        if (ref) {
            ref.onClose.subscribe((datosDeLaTarea: any) => {
    
                if (datosDeLaTarea) {
                    const nuevaTareaEstructurada = {
                        id: String(this.tareas.length + 1), 
                        nombreTarea: datosDeLaTarea.titulo, 
                        estado: 'PENDIENTE' 
                    };

                    this.tareas = [...this.tareas, nuevaTareaEstructurada];

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Tarea Creada',
                        detail: 'Se agregó la tarea exitosamente al listado.'
                    });
                }
            });
        }
    }
}