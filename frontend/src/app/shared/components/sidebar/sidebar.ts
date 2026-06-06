import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from '../../../core/service/ui';
import { AuthService } from '../../../features/auth/auth-service';
import { AuthStore } from '../../../features/auth/auth-store';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: true
})
export class Sidebar {
  private router: Router = inject(Router);
  private uiService: UiService = inject(UiService);
  private location: Location = inject(Location);
  private readonly authService = inject(AuthService);
  private authStore = inject(AuthStore);

  rolActual = this.authStore.obtenerRol();

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }

  abrirNuevoProyecto(): void {
    this.uiService.openNuevoProyecto();
  }

  volverAnterior(): void {
    this.location.back();
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
  }
}
