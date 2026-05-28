import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { EstadoProyecto } from '../enum/estado-proyecto.enum';
import { CreateProyectoDto } from '../dtos/input/create-proyecto.dto';
import { UpdateProyectoDto } from '../dtos/input/update-proyecto.dto';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
  ) {}

  async crearProyecto(dto: CreateProyectoDto): Promise<{ id: number }> {
    // TypeORM validará si el nombre ya existe por el 'unique' en la entity
    const proyecto = this.proyectosRepository.create({
      ...dto,
      estado: dto.estado || EstadoProyecto.ACTIVO,
    });
    
    await this.proyectosRepository.save(proyecto);
    return { id: proyecto.id };
  }

  async obtenerTodos(): Promise<Proyecto[]> {
    // relations: ['cliente'] trae los datos del cliente anidado, quítalo si no lo necesitas en el GET general
    return await this.proyectosRepository.find({ relations: ['cliente'] });
  }

  async obtenerPorId(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectosRepository.findOne({ 
      where: { id },
      relations: ['cliente', 'tareas'] // Para traer sus tareas si quieres CLIENTE SEGUN EL PROFE SE BORRA
    });
    
    if (!proyecto) {
      throw new NotFoundException(`El proyecto con ID ${id} no existe`);
    }
    return proyecto;
  }

//   async actualizarProyecto(id: number, dto: UpdateProyectoDto): Promise<void> {
//     const proyecto = await this.obtenerPorId(id);
//     this.proyectosRepository.merge(proyecto, dto);
//     await this.proyectosRepository.save(proyecto);
//   }

//   async eliminarProyecto(id: number): Promise<void> {
//     const proyecto = await this.obtenerPorId(id);
//     proyecto.estado = EstadoProyecto.BAJA;
//     await this.proyectosRepository.save(proyecto);
//   }
// }

async actualizarProyecto(id: number, dto: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await this.obtenerPorId(id);
    
    // Fusiona los cambios del DTO en la entidad encontrada
    this.proyectosRepository.merge(proyecto, dto);
    
    // Guarda y retorna la entidad con los datos frescos
    return await this.proyectosRepository.save(proyecto);
  }

  async eliminarProyecto(id: number) {
    const proyecto = await this.obtenerPorId(id);
    
    // Aplicamos la baja lógica cambiando el enum
    proyecto.estado = EstadoProyecto.BAJA;
    
    await this.proyectosRepository.save(proyecto);
    return { message: `El proyecto con ID ${id} fue dado de baja exitosamente.` };
  }
}
