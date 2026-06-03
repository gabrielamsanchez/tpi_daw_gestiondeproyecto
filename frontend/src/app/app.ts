import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/service/theme'; // Asegurate de poner la ruta correcta a tu archivo

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  // Forma moderna y limpia de inyectar servicios en Angular
  public themeService = inject(ThemeService);

  ngOnInit() {
    // Al instanciarse el componente, el constructor del ThemeService
    // ya se ejecuta automáticamente y aplica el tema guardado.
  }
}
