import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.initCalendarOptions();
  }

  initCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      initialView: 'dayGridMonth', //  vista de mes completo
      locale: 'es', 
      
      // Barra de herramientas superior para navegar entre meses
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
      
      // Eventos de prueba 
      events: [
        { title: 'Reunión con el cliente', start: '2026-06-04', color: '#3b82f6' },
        { title: 'Entrega wireframes', start: '2026-06-05', color: '#10b981' }
      ]
    };
  }
}