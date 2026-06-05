import { Controller, Get } from '@nestjs/common';

@Controller('calendario')
export class CalendarioController {
  @Get()
  obtenerEventosCalendario() {
    return [
      {
        descripcion: 'Reunión con el cliente desde NestJS',
        fecha_inicio: '2026-06-15',
        fecha_limite: '2026-06-16',
      },
      {
        descripcion: 'Entrega final del backend',
        fecha_inicio: '2026-06-20',
        fecha_limite: '2026-06-22',
      },
    ];
  }
}
