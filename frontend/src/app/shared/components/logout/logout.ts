import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button'; 
import { AuthService } from '../../../features/auth/auth-service';
@Component({
  selector: 'app-logout',
  standalone: true, 
  imports: [ButtonModule], 
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  private readonly authService = inject(AuthService);

  cerrarSesion(): void {
    this.authService.cerrarSesion();
  }
}