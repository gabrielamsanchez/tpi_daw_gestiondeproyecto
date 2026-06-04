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

import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
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
    private cdr = inject(ChangeDetectorRef); // Inyectado para refrescar cambios en tiempo real

    clientes: InterfaceCliente[] = [];
    estados: SelectItem[] = [];
    clonedClientes: { [s: number]: InterfaceCliente } = {}; // Indexado por ID numérico

    ngOnInit() {
        this.loadClientes();

        // CORRECCIÓN 1: Los values deben ser exactamente 'ACTIVO' y 'BAJA' en mayúsculas
        this.estados = [
            { label: 'Activo', value: 'ACTIVO' },
            { label: 'Inactivo / Baja', value: 'BAJA' }
        ];
    }

    loadClientes() {
        this.clienteService.getClientes().subscribe({
            next: (data) => {
                this.clientes = data;
                this.cdr.markForCheck(); // Fuerza el renderizado visual de la lista
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron recuperar los clientes.' })
        });
    }

    onRowEditInit(cliente: InterfaceCliente) {
        this.clonedClientes[cliente.id] = { ...cliente };
    }

    onRowEditSave(cliente: InterfaceCliente) {
        // CORRECCIÓN 2: Removemos el id de las propiedades para que NestJS no rebote por "property id should not exist"
        const { id, ...datosParaActualizar } = cliente;

        // Construimos el payload limpio y seguro que el DTO espera recibir
        const payloadLimpio = {
            nombre: datosParaActualizar.nombre,
            estado: datosParaActualizar.estado,
            telefono: datosParaActualizar.telefono || undefined,
            correo: datosParaActualizar.correo || undefined
        };

        // Pasamos el id numérico por un lado para la URL, y el objeto filtrado por el otro para el body
        this.clienteService.updateCliente(cliente.id, payloadLimpio).subscribe({
            next: () => {
                delete this.clonedClientes[cliente.id];
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado con éxito en Postgres.' });
                this.cdr.markForCheck(); // Refresca la fila visual de forma asíncrona
            },
            error: (err) => {
                console.error('Falla en NestJS:', err.error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falla al guardar en el servidor.' });
                this.loadClientes(); // Revierte el frontend al estado original de la DB
            }
        });
    }

    onRowEditCancel(cliente: InterfaceCliente, index: number) {
        this.clientes[index] = this.clonedClientes[cliente.id];
        delete this.clonedClientes[cliente.id];
        this.cdr.markForCheck();
    }

    crearNuevoCliente() {
    const ref = this.uiService.openNuevoCliente();
      if (ref) {
          ref.onClose.subscribe((datosDelCliente: any) => {
              if (datosDelCliente) {

                  // 💡 ARMAMOS EL PAYLOAD PERFECTO PARA EL DTO DE NESTJS
                  const nuevoClientePayload = {
                      nombre: datosDelCliente.nombre,
                      // Forzamos a que el estado vaya en mayúsculas ('ACTIVO' o 'BAJA') pase lo que pase
                      estado: datosDelCliente.estado ? datosDelCliente.estado.toUpperCase() : 'ACTIVO',
                      // Si el teléfono o correo vienen vacíos (""), los pasamos a undefined
                      // para que @IsOptional() en NestJS funcione correctamente y no falle el validador
                      telefono: datosDelCliente.telefono?.trim() || undefined,
                      correo: datosDelCliente.correo?.trim() || undefined
                  };

                  console.log('Enviando este payload de creación a NestJS:', nuevoClientePayload);

                  this.clienteService.createCliente(nuevoClientePayload).subscribe({
                      next: () => {
                          this.loadClientes(); // Recarga la tabla de Postgres para mostrar el nuevo cliente
                          this.messageService.add({
                              severity: 'success',
                              summary: 'Cliente Creado',
                              detail: 'Guardado en base de datos de forma exitosa.'
                          });
                      },
                      error: (err) => {
                          console.error('Error detallado al crear cliente:', err.error);
                          this.messageService.add({
                              severity: 'error',
                              summary: 'Error',
                              detail: 'Hubo un problema al crear el cliente. Revisá la consola.'
                          });
                      }
                  });
              }
          });
      }
  }

    
}
