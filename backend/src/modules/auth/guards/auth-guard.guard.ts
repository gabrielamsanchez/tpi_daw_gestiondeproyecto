import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: number;
  nombre: string;
  rol: string;
}

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    //despues borrar es de prueba
    console.log('--- ENTRANDO AL GUARD ---');
    console.log('Authorization:', request.headers.authorization);

    const token = this.extractTokenFromHeader(request);
    //despues borrar es de prueba
    console.log('Token extraído:', token);

    if (!token) {
      console.log('Fallo: No se encontró token');
      throw new UnauthorizedException('Token no provisto');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      console.log('Payload del JWT exitoso:', payload);

      request['user'] = payload;
    } catch (error) {
      //borrar el console.error despues
      console.error(
        'Error interno al verificar el JWT:',
        error instanceof Error ? error.message : error,
      );
      throw new UnauthorizedException('Token expirado o inválido');
    }

    return true;
  }
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
