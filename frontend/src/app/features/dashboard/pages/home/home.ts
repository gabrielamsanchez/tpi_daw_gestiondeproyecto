// 
import { Component, OnInit, Inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { UiService } from '../../../../core/service/ui';
import { ProyectoService } from '../../../../core/service/proyecto';
import { TareaService } from '../../../../../app/features/tareas/services/tarea.service'; 
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { AuthStore } from '../../../../features/auth/auth-store';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { PLATFORM_ID } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-home',
  imports: [ChartModule, ButtonModule, CommonModule, FullCalendarModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {

  chartData: any;
  chartOptions: any;
  isBrowser = false;
  username: string = '';
  calendarOptions: any;

  constructor(
    private uiService: UiService,
    private proyectoService: ProyectoService,
    private tareaService: TareaService, // <-- Servicio Inyectado correctamente
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
          });
        }
      });
    }
  }

  abrirModalNuevaTarea() {
    const ref = this.uiService.openNuevaTarea();

    if (ref) {
      ref.onClose.subscribe((datosDeLaTarea: any) => {
        if (datosDeLaTarea) {
          
          // Creamos el objeto adaptado estrictamente a tu interfaz TareaPayload del Frontend
          const tareaMapeada = {
            descripcion: datosDeLaTarea.titulo || 'Nueva Tarea',
            id_proyecto: Number(datosDeLaTarea.proyectoId),
            estado: 'PENDIENTE', // Forzamos mayúsculas para evitar el error 400 de NestJS
            // Evitamos pasar 'null' usando fechas por defecto o asegurando instancias de Date reales
            fecha_inicio: datosDeLaTarea.fecha_inicio ? new Date(datosDeLaTarea.fecha_inicio) : new Date(),
            fecha_limite: datosDeLaTarea.fecha_limite ? new Date(datosDeLaTarea.fecha_limite) : new Date()
          };

          console.log('Datos listos y corregidos para TareaPayload. Enviando a NestJS:', tareaMapeada);

          this.tareaService.crearTarea(tareaMapeada).subscribe({
            next: (respuesta) => {
              console.log('¡Éxito! Tarea guardada en PostgreSQL:', respuesta);
            },
            error: (err) => {
              console.error('El backend rechazó la tarea:', err);
            }
          });
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