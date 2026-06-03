import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
// 1. CORRECCIÓN: Apuntamos al archivo específico .ts del servicio
import { ThemeService } from '../../../core/service/theme';

@Component({
  selector: 'app-layout',
  // 2. CORRECCIÓN: Sacamos ThemeService de acá adentro
  imports: [RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  // Al ponerlo público en el constructor, tu HTML <layout.html> ya lo lee sin problemas
  constructor(public themeService: ThemeService) {}
}
