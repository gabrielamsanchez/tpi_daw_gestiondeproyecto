import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/input/login.dtos';
import { UsuarioServiceService } from '../usuarios-service/usuarios-service.service';

@Injectable()
export class AuthServiceService {
  
  constructor(
    private readonly usuariosService: UsuarioServiceService, 
    private readonly jwtService: JwtService
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
      nombre: usuario.nombre 
    };

    return {
      accessToken: this.jwtService.sign(payload) 
    };
 } 
}
}