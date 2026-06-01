import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Back } from '../../shared/components/back/back';
import { UsuarioService } from '../../core/service/usuario-service';
import { Usuario } from '../../shared/interfaces/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, Back ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  private readonly usuarioService = inject(UsuarioService);

  usuarios: Usuario[] = [];

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService
      .getUsuarios()
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
        },
        error: () => {
          this.usuarios = [];
        },
      });
  }
}