import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';

import { EstadoCliente } from '../clientes/enum/estado-cliente-enum';
import { EstadoProyecto } from '../proyectos/enum/estado-proyecto.enum';
import { EstadoTarea } from '../tareas/enum/estado-tareas-enum';
import { Tarea } from '../tareas/entities/tarea-entity';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
    @InjectRepository(Tarea)
    private readonly tareaRepo: Repository<Tarea>,
  ) {}

  async obtenerResumenGeneral() {
    // Usamos Promise.all para ejecutar las 9 consultas en paralelo
    // Esto reduce el tiempo de respuesta del servidor drásticamente
    const [
      totalClientes, clientesActivos, clientesBaja,
      totalProyectos, proyectosActivos, proyectosFinalizados, proyectosBaja,
      totalTareas, tareasPendientes, tareasCompletadas
    ] = await Promise.all([
      // Clientes
      this.clienteRepo.count(),
      this.clienteRepo.count({ where: { estado: EstadoCliente.ACTIVO } }),
      this.clienteRepo.count({ where: { estado: EstadoCliente.BAJA } }),
      
      // Proyectos
      this.proyectoRepo.count(),
      this.proyectoRepo.count({ where: { estado: EstadoProyecto.ACTIVO } }),
      this.proyectoRepo.count({ where: { estado: EstadoProyecto.FINALIZADO } }),
      this.proyectoRepo.count({ where: { estado: EstadoProyecto.BAJA } }),

      // Tareas
      this.tareaRepo.count(),
      this.tareaRepo.count({ where: { estado: EstadoTarea.PENDIENTE } }),
      this.tareaRepo.count({ where: { estado: EstadoTarea.FINALIZADA } }),
    ]);

    // Armamos un JSON estructurado y limpio para que el Frontend lo consuma fácil
    return {
      clientes: {
        total: totalClientes,
        activos: clientesActivos,
        baja: clientesBaja,
      },
      proyectos: {
        total: totalProyectos,
        activos: proyectosActivos,
        finalizados: proyectosFinalizados,
        baja: proyectosBaja,
      },
      tareas: {
        total: totalTareas,
        pendientes: tareasPendientes,
        completadas: tareasCompletadas,
      },
    };
  }
}