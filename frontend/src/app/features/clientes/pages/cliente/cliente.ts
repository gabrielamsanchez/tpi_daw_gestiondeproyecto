
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { Back } from '../../../../shared/components/back/back';

interface ClienteInterface {
    id: string;
    nombre: string;
    estado: string;
}

@Component({
    selector: 'app-tabla-clientes',
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
        Back
    ],
    providers: [MessageService],
    templateUrl: './cliente.html',
    styleUrls: ['./cliente.css']
})
export class Cliente implements OnInit {
    private messageService = inject(MessageService);

    clientes: ClienteInterface[] = [];
    estados: SelectItem[] = [];
    clonedClientes: { [s: string]: ClienteInterface } = {};

    ngOnInit() {
        this.clientes = [
            { id: '1', nombre: '', estado: '' },
            { id: '2', nombre: '', estado: '' },
            { id: '3', nombre: '', estado: '' },
            { id: '4', nombre: '', estado: '' }
        ];

        this.estados = [
            { label: 'Activo', value: 'Activo' },
            { label: 'Inactivo', value: 'Inactivo' }
        ];
    }

    onRowEditInit(cliente: ClienteInterface) {
        this.clonedClientes[cliente.id] = { ...cliente };
    }

    onRowEditSave(cliente: ClienteInterface) {
        delete this.clonedClientes[cliente.id];
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado' });
    }

    onRowEditCancel(cliente: ClienteInterface, index: number) {
        this.clientes[index] = this.clonedClientes[cliente.id];
        delete this.clonedClientes[cliente.id];
    }
}
