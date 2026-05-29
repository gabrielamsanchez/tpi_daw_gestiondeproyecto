import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { EstadoProyecto } from '../enum/estado-proyecto.enum';
import { CreateProyectoDto } from '../dtos/input/create-proyecto.dto';
import { UpdateProyectoDto } from '../dtos/input/update-proyecto.dto';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { EstadoCliente } from '../../clientes/enum/estado-cliente-enum';
import { QueryProyectoDto } from '../dtos/input/query-proyecto.dto';
import { ProyectosExportService } from './proyectos-export.service';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
    private readonly exportService: ProyectosExportService,
  ) {}

  //necesitamos validar el cliente exista y que este en estado activo.
  private async validarClienteActivo(idCliente: number): Promise<void> {
    const cliente = await this.clientesRepository.findOne({
      where: { id: idCliente },
    });

    if (!cliente) {
      throw new NotFoundException(`El cliente con ID ${idCliente} no existe`);
    }
    if (cliente.estado !== EstadoCliente.ACTIVO) {
      throw new BadRequestException(
        'Solo se pueden asignar proyectos a clientes en estado ACTIVO',
      );
    }
  }

  async crearProyecto(dto: CreateProyectoDto): Promise<{ id: number }> {
    // 1. Validamos la regla de negocio del cliente
    if (dto.idCliente) {
      await this.validarClienteActivo(dto.idCliente);
    }

    const proyecto = this.proyectosRepository.create({
      ...dto,
      estado: dto.estado || EstadoProyecto.ACTIVO,
    });

    await this.proyectosRepository.save(proyecto);
    return { id: proyecto.id };
  }

  // BÚSQUEDA AVANZADA IMPLEMENTADA
  async obtenerTodos(query: QueryProyectoDto) {
    const { search, estado, page = 1, limit = 10 } = query;
    const qb = this.proyectosRepository
      .createQueryBuilder('proyecto')
      .leftJoinAndSelect('proyecto.cliente', 'cliente'); // Traemos datos del cliente

    // Filtro por nombre
    if (search) {
      qb.andWhere('proyecto.nombre ILIKE :search', { search: `%${search}%` });
    }

    // Filtro por estado
    if (estado) {
      qb.andWhere('CAST(proyecto.estado AS text) = :estado', { estado });
    }

    // Ordenamiento por defecto (los más nuevos primero)
    qb.orderBy('proyecto.id', 'DESC');

    // Paginación
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      paginaActual: page,
      totalPaginas: Math.ceil(total / limit),
    };
  }

  async obtenerPorId(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectosRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!proyecto) {
      throw new NotFoundException(`El proyecto con ID ${id} no existe`);
    }
    return proyecto;
  }

  async actualizarProyecto(
    id: number,
    dto: UpdateProyectoDto,
  ): Promise<Proyecto> {
    const proyecto = await this.obtenerPorId(id);

    // Validamos el cliente si se está intentando cambiar
    if (dto.idCliente && dto.idCliente !== proyecto.idCliente) {
      await this.validarClienteActivo(dto.idCliente);
    }

    this.proyectosRepository.merge(proyecto, dto);
    return await this.proyectosRepository.save(proyecto);
  }

  async eliminarProyecto(id: number) {
    const proyecto = await this.obtenerPorId(id);
    proyecto.estado = EstadoProyecto.BAJA;
    await this.proyectosRepository.save(proyecto);
    return {
      message: `El proyecto con ID ${id} fue dado de baja exitosamente.`,
    };
  }

  //para el export
  async exportarCsv(query: QueryProyectoDto): Promise<string> {
    return await this.exportService.exportarAStrCsv(query);
  }

  async exportarProyectoConTareasCsv(idProyecto: number): Promise<string> {
    return await this.exportService.exportarProyectoConTareasCsv(idProyecto);
  }
}
