// import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
// import { Component, OnInit, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { SelectModule } from 'primeng/select';
// import { TableModule } from 'primeng/table';
// import { TagModule } from 'primeng/tag';
// import { ToastModule } from 'primeng/toast';
// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { RippleModule } from 'primeng/ripple';
// import { CommonModule } from '@angular/common';
// import { MessageService, SelectItem } from 'primeng/api';
// import { Card } from 'primeng/card';
// import { UiService } from '../../../../core/service/ui';

// interface ClienteInterface {
//     id: string;
//     nombre: string;
//     estado: string;
//     telefono?: string; // Los agregué opcionales para que no te chillen con el mock inicial
//     correo?: string;
// }

// @Component({
//     selector: 'app-tabla-clientes',
//     standalone: true,
//     imports: [
//         CommonModule,
//         Card,
//         SelectModule,
//         TableModule,
//         TagModule,
//         ToastModule,
//         ButtonModule,
//         InputTextModule,
//         RippleModule,
//         FormsModule,
//     ],
//     providers: [MessageService],
//     templateUrl: './cliente.html',
//     styleUrls: ['./cliente.css']
// })
// export class Cliente implements OnInit {
//     private messageService = inject(MessageService);
//     private uiService = inject(UiService);

//     clientes: ClienteInterface[] = [];
//     estados: SelectItem[] = [];
//     clonedClientes: { [s: string]: ClienteInterface } = {};

//     ngOnInit() {
//         this.clientes = [
//             { id: '1', nombre: 'Cliente A', estado: 'Activo', telefono: '12345', correo: 'a@test.com' },
//             { id: '2', nombre: 'Cliente B', estado: 'Inactivo', telefono: '67890', correo: 'b@test.com' }
//         ];

//         this.estados = [
//             { label: 'Activo', value: 'Activo' },
//             { label: 'Inactivo', value: 'Inactivo' }
//         ];
//     }

//     onRowEditInit(cliente: ClienteInterface) {
//         this.clonedClientes[cliente.id] = { ...cliente };
//     }

//     onRowEditSave(cliente: ClienteInterface) {
//         delete this.clonedClientes[cliente.id];
//         this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado' });
//     }

//     onRowEditCancel(cliente: ClienteInterface, index: number) {
//         this.clientes[index] = this.clonedClientes[cliente.id];
//         delete this.clonedClientes[cliente.id];
//     } // <-- ACÁ CERRAMOS CORRECTAMENTE onRowEditCancel

//     // NUEVO MÉTODO: Ahora está libre y al nivel de los demás
//     crearNuevoCliente() {
//         const ref = this.uiService.openNuevoCliente();

//         if (ref) {
//             ref.onClose.subscribe((datosDelCliente: any) => {
//                 if (datosDelCliente) {
//                     const nuevoCliente: ClienteInterface = {
//                         id: String(this.clientes.length + 1),
//                         nombre: datosDelCliente.nombre,
//                         estado: datosDelCliente.estado,
//                         telefono: datosDelCliente.telefono || '',
//                         correo: datosDelCliente.correo || ''
//                     };

//                     this.clientes = [...this.clientes, nuevoCliente];

//                     this.messageService.add({
//                         severity: 'success',
//                         summary: 'Cliente Creado',
//                         detail: 'Se agregó el cliente exitosamente al listado.'
//                     });
//                 }
//             });
//         }
//     }
// }

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { ClienteService } from '../../service/service';
import { UiService } from '../../../../core/service/ui';
import { InterfaceCliente, EstadoCliente } from '../../../../core/interfaces/interface-cliente';

@Component({
    selector: 'app-tabla-clientes',
    standalone: true,
    imports: [CommonModule, Card, SelectModule, TableModule, ToastModule, ButtonModule, InputTextModule, FormsModule],
    providers: [MessageService],
    templateUrl: './cliente.html',
    styleUrls: ['./cliente.css']
})
export class Cliente implements OnInit {
    private messageService = inject(MessageService);
    private uiService = inject(UiService);
    private clienteService = inject(ClienteService);

    clientes: InterfaceCliente[] = [];
    estados: SelectItem[] = [];
    clonedClientes: { [s: number]: InterfaceCliente } = {}; // Indexado por ID numérico

    ngOnInit() {
        this.loadClientes();

        // Mapeo exacto de los valores en mayúsculas que NestJS/Postgres validan
        this.estados = [
            { label: 'Activo', value: EstadoCliente.ACTIVO },
            { label: 'Inactivo / Baja', value: EstadoCliente.BAJA }
        ];
    }

    loadClientes() {
        this.clienteService.getClientes().subscribe({
            next: (data) => this.clientes = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron recuperar los clientes.' })
        });
    }

    onRowEditInit(cliente: InterfaceCliente) {
        this.clonedClientes[cliente.id] = { ...cliente };
    }

    onRowEditSave(cliente: InterfaceCliente) {
        this.clienteService.updateCliente(cliente.id, cliente).subscribe({
            next: () => {
                delete this.clonedClientes[cliente.id];
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado con éxito en Postgres.' });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falla al guardar en el servidor.' });
                this.loadClientes(); // Revierte cambios visuales
            }
        });
    }

    onRowEditCancel(cliente: InterfaceCliente, index: number) {
        this.clientes[index] = this.clonedClientes[cliente.id];
        delete this.clonedClientes[cliente.id];
    }

    crearNuevoCliente() {
        const ref = this.uiService.openNuevoCliente();
        if (ref) {
            ref.onClose.subscribe((datosDelCliente: any) => {
                if (datosDelCliente) {
                    this.clienteService.createCliente(datosDelCliente).subscribe({
                        next: () => {
                            this.loadClientes();
                            this.messageService.add({ severity: 'success', summary: 'Cliente Creado', detail: 'Guardado en base de datos.' });
                        },
                        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al crear el cliente.' })
                    });
                }
            });
        }
    }
}
