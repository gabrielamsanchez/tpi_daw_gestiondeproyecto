import { Component, OnInit, inject, ChangeDetectorRef, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SelectItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


// Imports desde el Core
import { UiService } from '../../../../core/service/ui';
import { Back } from '../../../../shared/components/back/back';

// Imports desde su propio dominio (Features)
import { ProyectoService } from '../../services/proyecto';
import { Proyecto } from '../../../../shared/interfaces/proyecto';


@Component({
    selector: 'app-proyecto-list',
    imports: [
        SelectModule, TableModule, TagModule, ToastModule, 
        ButtonModule, InputTextModule, RippleModule, 
        FormsModule, Back
    ],
    templateUrl: './proyecto-list.html',
    styleUrls: ['./proyecto-list.css'],
    providers: [MessageService] 
})
export class ProyectoList implements OnInit {
    private messageService = inject(MessageService);
    private uiService = inject(UiService); 
    private proyectoService = inject(ProyectoService);
    private cdr = inject(ChangeDetectorRef);
    private router = inject(Router);
    proyectos = signal<Proyecto[]>([]);
    statuses!: SelectItem[];
    clonedProyectos: { [s: string]: Proyecto } = {};


    ngOnInit() {
        this.cargarProyectos();
     
        this.statuses = [
            { label: 'Activo', value: 'ACTIVO' },
            { label: 'Finalizado', value: 'FINALIZADO' },
            { label: 'Baja Lógica', value: 'BAJA' }
        ];
    }  
    
    verDetalleProyecto(proyecto: Proyecto) {
        this.router.navigate(['/proyectos', proyecto.id, 'tareas']);
    }

    cargarProyectos() {
        this.proyectoService.obtenerProyectos(1, 50).subscribe({
            next: (response) => {

                this.proyectos.set(response.data);
                this.cdr.detectChanges();
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los proyectos' });
            }
        });
    }

    onRowEditInit(proyecto: Proyecto) {
        this.clonedProyectos[proyecto.id] = { ...proyecto };
    }

    onRowEditSave(proyecto: Proyecto) {
        if (proyecto.nombre && proyecto.nombre.trim().length > 0) {
            
            // 1. Armamos el paquete limpio para que NestJS no devuelva Error 400
            const payloadLimpio = {
                nombre: proyecto.nombre,
                estado: proyecto.estado,
                idCliente: proyecto.idCliente
            };

            // Enviamos payloadLimpio en vez del proyecto entero
            this.proyectoService.actualizarProyecto(proyecto.id, payloadLimpio).subscribe({
                next: (proyectoActualizado) => {
                    delete this.clonedProyectos[proyecto.id];
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proyecto actualizado en la base de datos' });
                },
                error: (err) => {
                    console.error(err);
                    // 2. Le agregamos los paréntesis a proyectos() porque es una Signal
                    this.onRowEditCancel(proyecto, this.proyectos().findIndex(p => p.id === proyecto.id));
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fallo al actualizar el proyecto' });
                }
            });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'El nombre es obligatorio' });
        }
    }

    onRowEditCancel(proyecto: Proyecto, index: number) {
        this.proyectos.update(listaActual => {
            listaActual[index] = this.clonedProyectos[proyecto.id];
            return [...listaActual]; 
        });
        
        // 3. Faltaba eliminar el clon y CERRAR LA LLAVE de la función
        delete this.clonedProyectos[proyecto.id];
    }

    
    eliminarProyecto(proyecto: Proyecto) {
        this.proyectoService.eliminarProyecto(proyecto.id).subscribe({
            next: () => {
                proyecto.estado = 'BAJA'; 
                this.messageService.add({ severity: 'success', summary: 'Baja Lógica', detail: 'Proyecto enviado a la papelera' });
            }
        });
    }

    crearNuevoProyecto() {
        const ref = this.uiService.openNuevoProyecto();

        if (ref) {
            ref.onClose.subscribe((datos: Partial<Proyecto>) => {
                if (datos) {
                    this.proyectoService.crearProyecto(datos).subscribe({
                        next: () => {
                            this.cargarProyectos(); 
                            this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Proyecto registrado exitosamente' });
                        }
                    });
                }
            });
        }
    }

    exportarCsvBackend() {
        this.proyectoService.descargarCsv();
    }

    getSeverity(status: string) {
        switch (status) {
            case 'ACTIVO': return 'success';
            case 'FINALIZADO': return 'warn';
            case 'BAJA': return 'danger';
            default: return 'secondary';
        }
    }
}
