import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
//import { Sidebar } from '../../shared/components/sidebar/sidebar';

interface Usuario {
  nombre: string;
  estado: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  loading = false;
  usuarios: Usuario[] = [];

  ngOnInit() {
    this.usuarios = [//despues cambiar, es solo prueba
      { nombre: 'Ana', estado: 'ACTIVO' },
      { nombre: 'Luis', estado: 'ACTIVO' },
      { nombre: 'María', estado: 'INACTIVO' }
    ];
  }
}