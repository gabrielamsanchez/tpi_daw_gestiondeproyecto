// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// interface JwtPayload {
//   sub: number;
//   nombre: string;
// }
// @Injectable()
// export class AuthGuardGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request: Request = context.switchToHttp().getRequest();
//     const accessToken = this.extractTokenFromHeader(request);

//     if (!accessToken) {
//       throw new UnauthorizedException('Token no autorizado');
//     }
//     try {
//       const payload: JwtPayload =
//         await this.jwtService.verifyAsync(accessToken);
//       request['usuario'] = payload;
//     } catch {
//       throw new UnauthorizedException('Token expirado');
//     }
//     return true;
//   }
//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('--- ENTRANDO AL GUARD ---');
    console.log('Authorization:', request.headers.authorization);

    const token = this.extractTokenFromHeader(request);
    console.log('Token extraído:', token);

    if (!token) {
      console.log('Fallo: No se encontró token');
      throw new UnauthorizedException('Token no provisto');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET, 
      });

      console.log('Payload del JWT decodificado con éxito:', payload);

      request['user'] = payload;
    } catch (error) {
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
