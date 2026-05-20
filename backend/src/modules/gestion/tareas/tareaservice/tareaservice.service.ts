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

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareasRepository: Repository<Tarea>,
  ) {}
  async crearTarea(
    dto: CreateTareaDto,
    idProyecto: number,
  ): Promise<{ id: number }> {
    const tarea: Tarea = this.tareasRepository.create(dto);

    tarea.estado = EstadoTarea.PENDIENTE;
    tarea.idProyecto = idProyecto;
    await this.tareasRepository.save(tarea);
    return { id: tarea.id };
  }
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
