   import { Component, OnInit, inject, ChangeDetectorRef, signal, afterNextRender, PLATFORM_ID } from '@angular/core';
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
import { TareaService } from '../../services/tarea.service';
import { Tarea, TareaPayload } from '../../../../shared/interfaces/tarea';
import { ProyectoService } from '../../../proyectos/services/proyecto';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';



@Component({
    selector: 'app-tareas-tabla',
    standalone: true,
    imports: [
        SelectModule, TableModule, TagModule, ToastModule, 
        ButtonModule, InputTextModule, RippleModule, 
        FormsModule, Back,
    ],
    templateUrl: './tarea-list.html',
    styleUrls: ['./tarea-list.css'],
    providers: [MessageService] 
})
export class Tareas implements OnInit {
    private messageService = inject(MessageService);
    private uiService = inject(UiService); 
    private tareaService = inject(TareaService);
    private cdr = inject(ChangeDetectorRef);
    private proyectoService = inject(ProyectoService); // <-- Inyectamos el de proyectos
    private route = inject(ActivatedRoute); // <-- Inyectamos el lector de URLs
    private platformId = inject(PLATFORM_ID);
    // Guardamos el ID que leemos de la URL
    idProyectoActual!: number;

    // Convertimos la info del proyecto en una Signal para que sea reactiva
    infoProyecto = signal<any>(null);
    
    // Modernizado a Signals
    tareas = signal<Tarea[]>([]);
    statuses!: SelectItem[];
    clonedTareas: { [s: string]: Tarea } = {};
    loading = false;

    


    ngOnInit() {
        this.statuses = [
            { label: 'PENDIENTE', value: 'PENDIENTE' },
            { label: 'FINALIZADA', value: 'FINALIZADA' },
            { label: 'BAJA', value: 'BAJA' }
        ];

        if (isPlatformBrowser(this.platformId)) {
            
            this.route.paramMap.subscribe(params => {
                const id = params.get('id');
                if (id) {
                    this.idProyectoActual = Number(id);
                    this.cargarTodoElDetalle();
                }
            });
            
        }
    }

    cargarTodoElDetalle() {
        this.proyectoService.obtenerUnProyecto(this.idProyectoActual).subscribe({
            next: (proyecto) => {
                this.infoProyecto.set(proyecto);
                this.cdr.detectChanges();
            }
        });
// B. Cargamos las tareas (¡ahora es 100% dinámico!)
        // Ahora sí cargamos las tareas, porque idProyectoActual ya es un número real
        this.loadTareas();
    }

     

    loadTareas() {
        this.loading = true;
        // ¡Chau Hardcodeo! Usamos el ID de la clase
        this.tareaService.getTareasPorProyecto(this.idProyectoActual).subscribe({
            next: (data) => {
                this.tareas.set(Array.isArray(data) ? data : []);
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar las tareas' });
                this.cdr.detectChanges();
            }
        });
    }

    onRowEditInit(tarea: Tarea) {
        this.clonedTareas[tarea.id as string] = { ...tarea };
    }
    
    onRowEditSave(tarea: Tarea) {
        if (tarea.descripcion && tarea.descripcion.trim().length > 0) {
            
            const payload: TareaPayload = {
                descripcion: tarea.descripcion.trim(),
                estado: tarea.estado,
                id_proyecto: Number(tarea.id_proyecto),
            };

            this.tareaService.actualizarTarea(Number(tarea.id), payload).subscribe({
                next: () => {
                    delete this.clonedTareas[tarea.id as string];
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarea actualizada' });
                },
                error: (err) => {
                    console.error('Error al actualizar tarea:', err);
                    this.onRowEditCancel(tarea, this.tareas().findIndex(t => t.id === tarea.id));
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar la actualización' });
                }
            });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'La descripción no puede quedar vacía' });
        }
    }

    onRowEditCancel(tarea: Tarea, index: number) {
        this.tareas.update(listaActual => {
            listaActual[index] = this.clonedTareas[tarea.id as string];
            return [...listaActual]; 
        });
        delete this.clonedTareas[tarea.id as string];
    }

    crearNuevaTarea() {
        const ref = this.uiService.openNuevaTarea();

        if (ref) {
            ref.onClose.subscribe((datosDeLaTarea: any) => {
                if (datosDeLaTarea) {
                    const payload: TareaPayload = {
                        descripcion: datosDeLaTarea.titulo, 
                        estado: 'PENDIENTE',
                        id_proyecto: this.idProyectoActual // <-- Chau hardcodeo al crear
                    };

                    this.tareaService.crearTarea(payload).subscribe({
                        next: () => {
                            this.loadTareas(); // Recargamos de la base de datos
                            this.messageService.add({ severity: 'success', summary: 'Tarea Creada', detail: 'Se agregó la tarea con éxito.' });
                        },
                        error: () => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la tarea' });
                        }
                    });
                }
            });
        }
    }

    confirmDeleteTarea(tarea: Tarea) {
        if (confirm(`¿Estás seguro de eliminar "${tarea.descripcion}"?`)) {
            this.tareaService.eliminarTarea(Number(tarea.id)).subscribe({
                next: () => {
                    // Actualizamos la Signal filtrando la tarea eliminada
                    this.tareas.update(lista => lista.filter(t => t.id !== tarea.id));
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarea enviada a la papelera (Baja Lógica)' });
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar la tarea' });
                }
            });
        }
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
}

