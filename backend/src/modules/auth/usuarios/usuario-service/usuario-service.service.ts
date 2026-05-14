import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/input/usuario-entities';
import { Repository } from 'typeorm';
import { EstadoUsuario } from '../enum/estado-usurio.enum';

@Injectable()
export class UsuarioServiceService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findByNombre(nombre: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOneBy({
      nombre,
      estado: EstadoUsuario.ACTIVO,
    });
  }
}
