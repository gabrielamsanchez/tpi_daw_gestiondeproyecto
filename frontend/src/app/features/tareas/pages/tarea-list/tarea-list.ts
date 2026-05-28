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
import { Logout } from '../../../../shared/components/logout/logout';

interface TareaInterface {
    id: string;
    nombreProyecto: string;
    cliente: string;
    estado: string; 
}

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
    
    tareas: TareaInterface[] = [];
    statuses!: SelectItem[];
    cols: any[] = [];
    clonedTareas: { [s: string]: TareaInterface } = {};

    ngOnInit() {
  //ESTO DESPUES CAMBIAR

        this.tareas = [
            { id: '1', nombreProyecto: 'E-Commerce Alimentos', cliente: 'De Mil Amores', estado: 'EN_PROGRESO' },
            { id: '2', nombreProyecto: 'Sistema Gestión Interna', cliente: 'Estudio Alpha', estado: 'PLANIFICADO' },
            { id: '3', nombreProyecto: 'Landing Page Campaña', cliente: 'Catering Premium', estado: 'COMPLETADO' }
        ];

        this.cols = [
            { field: 'nombreProyecto', header: 'Nombre Proyecto' },
            { field: 'cliente', header: 'Cliente' },
            { field: 'estado', header: 'Estado' }
        ];


        this.statuses = [
            { label: 'Planificado', value: 'PLANIFICADO' },
            { label: 'En Progreso', value: 'EN_PROGRESO' },
            { label: 'Completado', value: 'COMPLETADO' }
        ];
    }

    onRowEditInit(tarea: TareaInterface) {
        this.clonedTareas[tarea.id as string] = { ...tarea };
    }

    onRowEditSave(tarea: TareaInterface) {
        if (tarea.nombreProyecto.trim().length > 0 && tarea.cliente.trim().length > 0) {
            delete this.clonedTareas[tarea.id as string];
            
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Éxito', 
                detail: 'Proyecto actualizado con éxito de forma local' 
            });
        } else {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Los campos obligatorios no pueden quedar vacíos' 
            });
        }
    }

    onRowEditCancel(tarea: TareaInterface, index: number) {
        this.tareas[index] = this.clonedTareas[tarea.id as string];
        delete this.clonedTareas[tarea.id as string];
    }

    getSeverity(status: string) {
        switch (status) {
            case 'COMPLETADO':
                return 'success';
            case 'EN_PROGRESO':
                return 'warn';
            case 'PLANIFICADO':
                return 'danger';
            default:
                return 'secondary';
        }
    }

    getLabelEstado(status: string): string {
      const found = this.statuses.find(s => s.value === status);
      return found?.label ?? status;
    }
}