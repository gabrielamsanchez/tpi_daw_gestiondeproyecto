// import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { SelectModule } from 'primeng/select';
// import { TableModule } from 'primeng/table';
// import { TagModule } from 'primeng/tag';
// import { ToastModule } from 'primeng/toast';
// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { RippleModule } from 'primeng/ripple';
// import { SelectItem, MessageService } from 'primeng/api';
// import { Back } from '../../../../shared/components/back/back';
// import { UiService } from '../../../../core/service/ui';
// import { TareaService } from '../../services/tarea.service';
// import { Tarea,TareaPayload } from '../../../../shared/interfaces/tarea';



// @Component({
//     selector: 'app-tareas-tabla',
//     standalone: true,
//     imports: [
//         CommonModule,
//         SelectModule, 
//         TableModule, 
//         TagModule, 
//         ToastModule, 
//         ButtonModule, 
//         InputTextModule, 
//         RippleModule, 
//         FormsModule, 
//         Back,
//     ],
//     templateUrl: './tarea-list.html',
//     styleUrls: ['./tarea-list.css'],
//     providers: [MessageService] 
// })
// export class Tareas implements OnInit {
//     private messageService = inject(MessageService);
//     private uiService = inject(UiService); 
//     private tareaService = inject(TareaService);
//     private cdr = inject(ChangeDetectorRef);

//     infoProyecto = {
//     nombre: 'Desarrollo Web DAW',
//     estado: 'En Progreso',
//     cliente: 'Nombre Cliente S.A.'
//     };
    
//     tareas: Tarea[] = [];
//     statuses!: SelectItem[];
//     cols: any[] = [];
//     clonedTareas: { [s: string]: Tarea } = {};
//     loading = false

//     ngOnInit() {

//         this.cols = [
//             { field: 'descripcion', header: 'Nombre Tarea' },
//             { field: 'estado', header: 'Estado' }
//         ];

//         this.statuses = [
//             { label: 'PENDIENTE', value: 'PENDIENTE' },
//             { label: 'FINALIZADA', value: 'FINALIZADA' },
//             { label: 'BAJA', value: 'BAJA' }
//         ];
//         this.loadTareas();
//     // afterNextRender(() => {
//     //     this.loadTareas();
//     // });
//     }

//     loadTareas() {
//     this.loading = true;
//     const idProyecto = 2;

//         this.tareaService.getTareasPorProyecto(idProyecto).subscribe({
//         next: (data) => {
//         this.tareas = Array.isArray(data) ? data : [];
//         this.loading = false;
//         this.cdr.detectChanges();
//         },
//         error: () => {
//         this.loading = false;
//         this.messageService.add({
//             severity: 'error',
//             summary: 'Error',
//             detail: 'Error al cargar las tareas'
//         });
//         this.cdr.detectChanges();
//         }
//     });
//     }

//     onRowEditInit(tarea: Tarea) {
//         this.clonedTareas[tarea.id as string] = { ...tarea };
//     }
    
//     onRowEditSave(tarea: Tarea) {
//     if (tarea.descripcion && tarea.descripcion.trim().length > 0) {
//         const payload: TareaPayload = {
//         descripcion: tarea.descripcion.trim(),
//         estado: tarea.estado,
//         id_proyecto: Number(tarea.id_proyecto),
//         };

//         this.tareaService.actualizarTarea(Number(tarea.id), payload).subscribe({
//         next: () => {
//             delete this.clonedTareas[tarea.id as string];
//             this.messageService.add({
//             severity: 'success',
//             summary: 'Éxito',
//             detail: 'Tarea actualizada'
//             });
//             this.loadTareas();
//         },
//         error: (err) => {
//             console.error(err);
//             this.messageService.add({
//             severity: 'error',
//             summary: 'Error',
//             detail: 'No se pudo guardar la actualización'
//             });
//         }
//         });
//     }
//     }
//     onRowEditCancel(tarea: Tarea, index: number) {
//         this.tareas[index] = this.clonedTareas[tarea.id as string];
//         delete this.clonedTareas[tarea.id as string];
//     }

//     getSeverity(status: string) {
//         switch (status) {
//             case 'PENDIENTE': return 'success';
//             case 'FINALIZADA': return 'warn';
//             case 'BAJA': return 'danger';
//             default: return 'secondary';
//         }
//     }

//     getLabelEstado(status: string): string {
//         const found = this.statuses.find(s => s.value === status);
//         return found?.label ?? status;
//     }


//     crearNuevaTarea() {
//         const ref = this.uiService.openNuevaTarea();

//         if (ref) {
//             ref.onClose.subscribe((datosDeLaTarea: any) => {
    
//                 if (datosDeLaTarea) {
//                     const nuevaTareaEstructurada = {
//                         id: String(this.tareas.length + 1), 
//                         descripcion: datosDeLaTarea.titulo, 
//                         estado: 'PENDIENTE' 
//                     };

//                     this.tareas = [...this.tareas, nuevaTareaEstructurada];
//                     this.messageService.add({
//                         severity: 'success',
//                         summary: 'Tarea Creada',
//                         detail: 'Se agregó la tarea con éxito.'
//                     });
//                 }
//             });
//         }
//     }

//     eliminarTarea(id: any) {
//     if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        
//         this.tareaService.eliminarTarea(Number(id)).subscribe({
//             next: () => {
            
//                 this.tareas = this.tareas.filter(t => t.id !== id);
                
//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Eliminado',
//                     detail: 'La tarea ha sido eliminada'
//                 });
//             },
//             error: (err) => {
//                 this.messageService.add({
//                     severity: 'error',
//                     summary: 'Error',
//                     detail: 'Error al eliminar tarea'
//                 });
//             }
//         });
//     }
// }
//     confirmDeleteTarea(tarea: any) {
//     if (confirm(`¿Estás seguro de eliminar "${tarea.nombreTarea}"?`)) {
        
//         this.tareaService.eliminarTarea(Number(tarea.id)).subscribe({
//             next: () => {
//                 this.tareas = this.tareas.filter(t => t.id !== tarea.id);
//                 this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarea eliminada' });
//             },
//             error: () => {
//                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar tarea' });
//             }
//         });
//     }
// }
//         }
    
import { Component, OnInit, inject, ChangeDetectorRef, signal } from '@angular/core';
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

    infoProyecto = {
        nombre: 'Desarrollo Web DAW',
        estado: 'En Progreso',
        cliente: 'Nombre Cliente S.A.'
    };
    
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
        this.loadTareas();
    }

    loadTareas() {
        this.loading = true;
        const idProyecto = 1; 

        this.tareaService.getTareasPorProyecto(idProyecto).subscribe({
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
                    
                    // Armamos el payload real para el backend
                    const payload: TareaPayload = {
                        descripcion: datosDeLaTarea.titulo, // Asumiendo que tu form devuelve 'titulo'
                        estado: 'PENDIENTE',
                        id_proyecto: 2 // Hardcodeado por ahora
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

