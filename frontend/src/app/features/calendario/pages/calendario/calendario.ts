import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CalendarioService } from '../../../../core/service/calendario.service'; 

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css'
})
export class CalendarioComponent implements OnInit {
  
  isBrowser = false;
  calendarOptions: any;
  listaEventos: any[] = [];

  private calendarioService = inject(CalendarioService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.initCalendarOptions();
    if (this.isBrowser) {
      this.cargarEventosDelBackend();
    }
  }

  initCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      initialView: 'dayGridMonth',
      locale: 'es', 
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,listMonth'
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        list: 'Agenda'
      },
      editable: true,
      selectable: true,
      events: []
    };
  }

  cargarEventosDelBackend() {
    this.calendarioService.obtenerEventos().subscribe({
      next: (tareasDesdeBack: any) => {
        // 👇 AGREGÁ ESTA LÍNEA TEMPORALMENTE
        console.log('Datos crudos que vienen de NestJS:', tareasDesdeBack);

        if (Array.isArray(tareasDesdeBack)) {
          this.listaEventos = tareasDesdeBack.map((tarea: any) => {
            const eventoMapeado = {
              title: tarea.descripcion || tarea.titulo, 
              start: tarea.fecha_inicio || tarea.fechaInicio,
              end: tarea.fecha_limite || tarea.fechaLimite,
              color: '#6366f1'
            };
            return eventoMapeado;
          });

          // 👇 AGREGÁ ESTA LÍNEA TEMPORALMENTE
          console.log('Eventos listos para FullCalendar:', this.listaEventos);

          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.listaEventos
          };
        }
      },
      error: (err) => {
        console.error('Error al mapear las tareas en el calendario:', err);
      }
    });
  }

}


