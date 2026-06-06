// import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
// import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';
// import { CalendarioService } from '../../../../core/service/calendario.service'; 

// @Component({
//   selector: 'app-calendario',
//   standalone: true,
//   imports: [CommonModule, FullCalendarModule],
//   templateUrl: './calendario.html',
//   styleUrl: './calendario.css'
// })
// export class CalendarioComponent implements OnInit {
  
//   isBrowser = false;
//   calendarOptions: any;
//   listaEventos: any[] = [];

//   private calendarioService = inject(CalendarioService);

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   ngOnInit() {
//     this.initCalendarOptions();
//     if (this.isBrowser) {
//       this.cargarEventosDelBackend();
//     }
//   }

//   initCalendarOptions() {
//     this.calendarOptions = {
//       plugins: [dayGridPlugin, interactionPlugin, listPlugin],
//       initialView: 'dayGridMonth',
//       locale: 'es', 
//       headerToolbar: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'dayGridMonth,dayGridWeek,listMonth'
//       },
//       buttonText: {
//         today: 'Hoy',
//         month: 'Mes',
//         week: 'Semana',
//         list: 'Agenda'
//       },
//       editable: true,
//       selectable: true,
//       events: []
//     };
//   }

//   cargarEventosDelBackend() {
//     this.calendarioService.obtenerEventos().subscribe({
//       next: (tareasDesdeBack: any) => {
//         console.log('Datos crudos que vienen de NestJS:', tareasDesdeBack);

//         if (Array.isArray(tareasDesdeBack)) {
//           this.listaEventos = tareasDesdeBack
//             // 1. Filtramos por seguridad aquellas tareas que no tengan fecha asignada en pgAdmin
//             .filter((tarea: any) => (tarea.fecha_inicio || tarea.fechaInicio))
//             .map((tarea: any) => {
              
//               const fInicio = tarea.fecha_inicio || tarea.fechaInicio;
//               const fLimite = tarea.fecha_limite || tarea.fechaLimite;

//               // 2. Auxiliar para extraer solo la parte 'YYYY-MM-DD' sin importar la zona horaria
//               const limpiarFecha = (fechaInput: any): string => {
//                 const d = new Date(fechaInput);
//                 // Si la fecha viene como Date o un ISO string largo, usamos getUTCFullYear para ignorar la zona horaria local
//                 const j = d.getUTCFullYear();
//                 const m = String(d.getUTCMonth() + 1).padStart(2, '0');
//                 const dia = String(d.getUTCDate()).padStart(2, '0');
//                 return `${j}-${m}-${dia}`;
//               };

//               // 3. Forzar a FullCalendar a que sume un día exclusivo al final para que pinte el bloque completo
//               const calcularFechaFinExclusiva = (fechaInput: any): string => {
//                 const d = new Date(fechaInput);
//                 d.setUTCDate(d.getUTCDate() + 1); // Sumamos 1 día para corregir el comportamiento exclusivo de FullCalendar
//                 const j = d.getUTCFullYear();
//                 const m = String(d.getUTCMonth() + 1).padStart(2, '0');
//                 const dia = String(d.getUTCDate()).padStart(2, '0');
//                 return `${j}-${m}-${dia}`;
//               };

//               const eventoMapeado = {
//                 id: tarea.id,
//                 title: tarea.descripcion || tarea.titulo || 'Nueva Tarea', 
//                 start: limpiarFecha(fInicio),
//                 end: fLimite ? calcularFechaFinExclusiva(fLimite) : calcularFechaFinExclusiva(fInicio),
//                 color: tarea.estado === 'FINALIZADA' ? '#10b981' : '#6366f1' // Verde si está lista, Índigo si sigue pendiente
//               };

//               return eventoMapeado;
//             });

//           console.log('Eventos corregidos listos para FullCalendar:', this.listaEventos);

//           // Actualizamos las opciones del calendario con la nueva lista procesada
//           this.calendarOptions = {
//             ...this.calendarOptions,
//             events: this.listaEventos
//           };
//         }
//       },
//       error: (err) => {
//         console.error('Error al mapear las tareas en el calendario:', err);
//       }
//     });
//   }
// }


import { Component, OnInit, Inject, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
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
  eventsLoaded = false; // 👈 1. AGREGA ESTA BANDERA

  private calendarioService = inject(CalendarioService);
  private cdr = inject(ChangeDetectorRef);

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
      events: [] // Dejar vacío aquí
    };
  }

  cargarEventosDelBackend() {
    this.calendarioService.obtenerEventos().subscribe({
      next: (tareasDesdeBack: any) => {
        // 🔍 IMPORTANTE: Mira en la consola del navegador qué imprime esta línea:
        console.log('Datos crudos que vienen de NestJS:', tareasDesdeBack);

        if (Array.isArray(tareasDesdeBack)) {
          const eventosMapeados = tareasDesdeBack.map((tarea: any) => {
            const startLimpio = tarea.fecha_inicio ? new Date(tarea.fecha_inicio).toISOString().split('T')[0] : null;
            const endLimpio = tarea.fecha_limite ? new Date(tarea.fecha_limite).toISOString().split('T')[0] : null;

            return {
              title: tarea.descripcion || tarea.titulo || 'Tarea sin título', 
              start: startLimpio,
              end: endLimpio,
              color: '#6366f1'
            };
          });

          this.listaEventos = eventosMapeados.filter(evento => evento.start !== null);

          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.listaEventos
          };

          this.eventsLoaded = true; // 👈 2. ACTIVAMOS LA BANDERA AQUÍ
          this.cdr.detectChanges(); 
        }
      },
      error: (err) => {
        console.error('Error al mapear las tareas en el calendario:', err);
      }
    });
  }
}