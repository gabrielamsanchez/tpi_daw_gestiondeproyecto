import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/input/login.dtos';
import { UsuarioServiceService } from '../../gestion/usuarios/usuario-service/usuario-service.service';

@Injectable()
export class AuthServiceService {
  constructor(
    private readonly usuariosService: UsuarioServiceService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const usuario = await this.usuariosService.findByNombre(dto.nombre); //busca por el nombre
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isClaveValida = await bcrypt.compare(dto.clave, usuario.clave);

    if (!isClaveValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
