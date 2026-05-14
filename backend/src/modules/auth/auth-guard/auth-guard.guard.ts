import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException('Token no autorizado');
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken);
      request['usuario'] = payload;

    } catch {
      throw new UnauthorizedException('Token expirado');
    }
    return true;
  }
   private extractTokenFromHeader(request: Request): string | undefined {
    return type === 'Bearer' ? token : undefined;
},

}
