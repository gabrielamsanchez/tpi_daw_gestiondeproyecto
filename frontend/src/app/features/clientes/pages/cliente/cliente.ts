import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { ClienteService } from '../../../../core/service/cliente';
import { InterfaceCliente } from '../../../../core/interfaces/interface-cliente';
import { UiService } from '../../../../core/service/ui';

@Component({
    selector: 'app-tabla-clientes',
    standalone: true,
    imports: [
        CommonModule,
        SelectModule,
        TableModule,
        ToastModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        Card,
    ],
    providers: [MessageService],
    templateUrl: './cliente.html',
    styleUrls: ['./cliente.css']
})
export class Cliente implements OnInit {
    private messageService = inject(MessageService);
    private uiService = inject(UiService);
    private clienteService = inject(ClienteService);
    private cdr = inject(ChangeDetectorRef);

    clientes: InterfaceCliente[] = [];
    estados: SelectItem[] = [];
    clonedClientes: { [s: number]: InterfaceCliente } = {};

    ngOnInit() {
        this.loadClientes();

        // Valores nativos mapeados con el enum estricto de Postgres
        this.estados = [
            { label: 'Activo', value: 'ACTIVO' },
            { label: 'Inactivo', value: 'BAJA' }
        ];
    }

    loadClientes() {
        this.clienteService.getClientes().subscribe({
            next: (data) => {
                this.clientes = data;
                this.cdr.markForCheck(); // Renderiza la grilla con la información real de Postgres
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron recuperar los clientes.' })
        });
    }

    onRowEditInit(cliente: InterfaceCliente) {
        // Almacenamos el clon exacto por si el usuario presiona cancelar en el modo edición
        this.clonedClientes[cliente.id] = { ...cliente };
    }

    onRowEditSave(cliente: InterfaceCliente) {
        // Extraemos el id para enviarlo en la URL y limpiamos el Payload para que Nest no devuelva Error 400
        const { id, ...datosParaActualizar } = cliente;

        const payloadLimpio = {
            nombre: datosParaActualizar.nombre,
            estado: datosParaActualizar.estado,
            telefono: datosParaActualizar.telefono || undefined,
            correo: datosParaActualizar.correo || undefined
        };

        this.clienteService.updateCliente(cliente.id, payloadLimpio).subscribe({
            next: () => {
                delete this.clonedClientes[cliente.id];
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado con éxito.' });
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Falla en NestJS:', err.error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falla al guardar los cambios en el servidor.' });
                this.loadClientes();
            }
        });
    }

    // ACCIÓN CANCELAR (Se ejecuta solo cuando la cruz se toca estando en modo EDICIÓN)
    onRowEditCancel(cliente: InterfaceCliente, index: number) {
        // Devuelve la fila a sus valores iniciales guardados en el clon
        this.clientes[index] = this.clonedClientes[cliente.id];
        delete this.clonedClientes[cliente.id];
        this.cdr.markForCheck(); // Notifica los cambios visuales
    }

    // ACCIÓN BAJA LÓGICA (Se ejecuta cuando la cruz se toca estando en modo LECTURA)
    solicitarEliminarCliente(cliente: InterfaceCliente) {
        this.clienteService.eliminarCliente(cliente.id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Baja Exitosa',
                    detail: `El cliente "${cliente.nombre}" no tiene proyectos asociados. Cambiado a Inactivo.`
                });
                this.loadClientes(); // Recarga la lista. Al venir con 'BAJA', el HTML pintará automáticamente 'Inactivo'
            },
            error: (err) => {
                // Captura el BadRequestException (400) que tira tu servicio de NestJS si tiene proyectos vinculados
                const mensajeError = err.error?.message || 'No se pudo procesar la baja del cliente.';

                this.messageService.add({
                    severity: 'error',
                    summary: 'Acción Bloqueada',
                    detail: mensajeError // "No se puede dar de baja el cliente porque tiene proyectos vinculados."
                });
            }
        });
    }

    crearNuevoCliente() {
        const ref = this.uiService.openNuevoCliente();
        if (ref) {
            ref.onClose.subscribe((datosDelCliente: any) => {
                if (datosDelCliente) {
                    const nuevoClientePayload = {
                        nombre: datosDelCliente.nombre,
                        estado: datosDelCliente.estado ? datosDelCliente.estado.toUpperCase() : 'ACTIVO',
                        telefono: datosDelCliente.telefono?.trim() || undefined,
                        correo: datosDelCliente.correo?.trim() || undefined
                    };

                    this.clienteService.createCliente(nuevoClientePayload).subscribe({
                        next: () => {
                            this.loadClientes();
                            this.messageService.add({ severity: 'success', summary: 'Cliente Creado', detail: 'Guardado de forma exitosa.' });
                        },
                        error: (err) => {
                            console.error('Error al crear cliente:', err.error);
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al crear el cliente.' });
                        }
                    });
                }
            });
        }
    }
}
