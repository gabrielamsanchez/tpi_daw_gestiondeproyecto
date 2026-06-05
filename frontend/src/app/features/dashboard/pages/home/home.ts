// 
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { UiService } from '../../../../core/service/ui';
import { ProyectoService } from '../../../../core/service/proyecto';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { AuthStore } from '../../../../features/auth/auth-store';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { Inject, PLATFORM_ID } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-home',
  imports: [ChartModule, ButtonModule, CommonModule, FullCalendarModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  chartData: any;
  chartOptions: any;
  isBrowser = false;
  username: string = '';
  calendarOptions: any;

  rolActual: string | null = null;
  constructor(
    private uiService: UiService,
    private proyectoService: ProyectoService,
    private authStore: AuthStore,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.initChart();
    this.initCalendarOptions();
    const nombreUsuario = this.authStore.obtenerNombreUsuario();
    this.username = nombreUsuario ?? 'Usuario';

    this.rolActual = this.authStore.obtenerRol();
  }

  initCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      initialView: 'listMonth',
      locale: 'es',
      headerToolbar: false,
      listDayFormat: false,
      listDaySideFormat: false,

      eventContent: (arg: any) => {
        const fecha = arg.event.start;
        const dia = fecha.getDate();
        const mes = fecha.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
        const proyecto = arg.event.extendedProps['proyecto'] || 'Sin proyecto';
        
        const etiqueta = this.calcularEtiqueta(fecha);

        return {
          html: `
            <div class="timeline-row">
              <div class="fecha-col">
                <div class="dia-num">${dia}</div>
                <div class="mes-txt">${mes}</div>
              </div>
              <div class="info-col">
                <div class="titulo-tarea">${arg.event.title}</div>
                <div class="proyecto-sub">${proyecto}</div>
              </div>
              <div class="badge-col">
                <span class="badge-tiempo">${etiqueta}</span>
              </div>
            </div>
          `
        };
      },
      events: [
        { title: 'Reunión con el cliente', start: '2026-06-04', extendedProps: { proyecto: 'Rediseño Web' }, color: '#3b82f6' },
        { title: 'Entrega wireframes', start: '2026-06-05', extendedProps: { proyecto: 'App Móvil' }, color: '#10b981' }
      ]
    };
  }

  // DEJAMOS UNA SOLA IMPLEMENTACIÓN DE LA FUNCIÓN ACÁ
  calcularEtiqueta(fecha: Date): string {
    const hoy = new Date();
    const fechaClon = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    const hoyClon = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    
    const diffTime = fechaClon.getTime() - hoyClon.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays < 0) return 'Pasado';
    return `En ${diffDays} días`;
  }

  initChart() {
    this.chartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Tareas Completadas',
          backgroundColor: '#818cf8', 
          borderColor: '#818cf8',
          data: [65, 59, 80, 81, 56, 95]
        },
        {
          label: 'Nuevos Proyectos',
          backgroundColor: '#38bdf8', 
          borderColor: '#38bdf8',
          data: [28, 48, 40, 19, 86, 27]
        }
      ]
    };

    this.chartOptions = {
      maintainAspectRatio: false, 
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: { color: '#495057' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#6c757d' },
          grid: { color: '#dfe7ef', drawBorder: false }
        },
        y: {
          ticks: { color: '#6c757d' },
          grid: { color: '#dfe7ef', drawBorder: false }
        }
      }
    };
  }

  abrirModalNuevoProyecto(){
    const ref = this.uiService.openNuevoProyecto();

    if (ref) {
      ref.onClose.subscribe((datosDelFormulario: any)=>{
        if(datosDelFormulario){
          this.proyectoService.crearProyecto(datosDelFormulario).subscribe({
            next: (respuesta) => {
              console.log('Respuesta del servidor recibida:', respuesta);
            },
            error: (err) => {
              console.log('Hubo un error:', err);
            }
          })
        }
      })
    }
  }

  abrirModalNuevaTarea() {
    const ref = this.uiService.openNuevaTarea();

    if (ref) {
      ref.onClose.subscribe((datosDeLaTarea: any) => {
        if (datosDeLaTarea) {
          console.log('Datos de la tarea listos para enviar:', datosDeLaTarea);
        }
      });
    }
  }

  navegarAUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }

  navegarAlCalendario(): void {
    this.router.navigate(['/calendario']); 
  }
}