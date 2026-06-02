import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea-entity';
import { EstadoTarea } from '../enum/estado-tareas-enum';
import { CreateTareaDto } from '../dtos/input/create-tarea-dto';
import { UpdateTareaDto } from '../dtos/input/update-tarea-dto';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareasRepository: Repository<Tarea>,
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
  ) {}
  //crear tarea
  /* async crearTarea(
    dto: CreateTareaDto,
    idProyecto: number,
  ): Promise<{ id: number }> {
    const tarea: Tarea = this.tareasRepository.create(dto);

    tarea.estado = EstadoTarea.PENDIENTE;
    tarea.id_Proyecto = idProyecto;
    await this.tareasRepository.save(tarea);
    return { id: tarea.id };
  }
   */
  async crearTarea(dto: CreateTareaDto): Promise<{ id: number }> {
    // 1. Validamos que el proyecto que viene en el Body realmente exista
    const proyecto = await this.proyectosRepository.findOne({
      where: { id: dto.id_proyecto },
    });

    if (!proyecto) {
      throw new NotFoundException(
        `El proyecto con ID ${dto.id_proyecto} no existe`,
      );
    }
    // 2. Creamos la tarea con los datos del DTO
    const tarea = this.tareasRepository.create({
      ...dto,
      estado: dto.estado || EstadoTarea.PENDIENTE,
    });

    await this.tareasRepository.save(tarea);
    return { id: tarea.id };
  }
  // NUEVO:
  async obtenerTareasPorProyecto(idProyecto: number): Promise<Tarea[]> {
    return await this.tareasRepository.find({
      order: { id: 'ASC' },
    });
  }
  //actualizar tarea
  async actualizarTarea(dto: UpdateTareaDto, idTarea: number): Promise<void> {
    const tarea = await this.tareasRepository.findOneBy({ id: idTarea });
    if (!tarea) {
      throw new BadRequestException('Tarea inexistente');
    }
    this.tareasRepository.merge(tarea, dto);
    await this.tareasRepository.save(tarea);
  }

  async eliminarTarea(idTarea: number): Promise<void> {
    const tarea = await this.tareasRepository.findOneBy({ id: idTarea });
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }
    tarea.estado = EstadoTarea.BAJA;
    await this.tareasRepository.save(tarea);
  }
}
