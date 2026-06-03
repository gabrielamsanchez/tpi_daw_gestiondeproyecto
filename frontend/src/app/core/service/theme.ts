import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Tema base por defecto (tu diseño propio)
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    if (this.isBrowser) {
      // Leemos si el usuario ya había elegido modo oscuro antes
      const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
      this.themeSubject.next(savedTheme);
      this.switchTheme(savedTheme);
    }
  }

  switchTheme(theme: 'light' | 'dark') {
    if (!this.isBrowser) return;

    if (theme === 'dark') {
      // Activa tus estilos oscuros y avisa a PrimeNG v18 para que use sus colores oscuros locales
      document.documentElement.classList.add('dark-mode');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      // Saca el modo oscuro. Vuelve tu diseño original y PrimeNG se apaga
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.style.colorScheme = 'light';
    }

    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const current = this.themeSubject.value;
    this.switchTheme(current === 'light' ? 'dark' : 'light');
  }
}
