import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { UiService } from '../../../../core/service/ui';
import { ProyectoService } from '../../../../core/service/proyecto';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import { AuthStore } from '../../../../features/auth/auth-store';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { Inject, PLATFORM_ID } from '@angular/core';
import { from } from 'rxjs/internal/observable/from';
import  dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';


@Component({
  selector: 'app-home',
  imports: [ChartModule, ButtonModule, CommonModule, FullCalendarModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  chartData: any;
  chartOptions: any;
  isBrowser = false;

  username: string = '';

  calendarOptions: any = {
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
    
    // Determinamos el texto del badge (Hoy, Mañana, etc.)
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

// Función para calcular si es Hoy o Mañana
calcularEtiqueta(fecha: Date): string {
  const hoy = new Date();
  const diffTime = fecha.getTime() - hoy.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Mañana';
  return `En ${diffDays} días`;
}


  constructor(
    private uiService: UiService,
    private proyectoService: ProyectoService,
    private authStore: AuthStore,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  ngOnInit() {
    this.initChart();
    const nombreUsuario = this.authStore.obtenerNombreUsuario();
    this.username = nombreUsuario ?? 'Usuario';
    //console.log('Nombre de usuario cargado:', this.username);
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

    // Opciones visuales del gráfico
    this.chartOptions = {
      maintainAspectRatio: false, // Permite que el gráfico respete el alto de su contenedor CSS
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
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

    // Verificamos que 'ref' no sea null antes de suscribirnos
    if (ref) {
      ref.onClose.subscribe((datosDelFormulario: any)=>{
        if(datosDelFormulario){
          console.log("Enviando datos al servidor(simulando)")
          this.proyectoService.crearProyecto(datosDelFormulario).subscribe({
            next: (respuesta) => {
              console.log('2. Respuesta del servidor recibida:', respuesta);

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
          // Aquí llamarás a tu TareaService(mock) en el futuro
        }
      });
    }
  }

  navegarAUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }

}
