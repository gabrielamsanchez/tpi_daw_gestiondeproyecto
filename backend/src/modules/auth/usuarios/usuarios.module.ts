import { Module } from '@nestjs/common';
import { UsuarioServiceService } from './usuario-service/usuario-service.service';

@Module({
  providers: [UsuarioServiceService],
  exports: [UsuarioServiceService],
})
export class UsuariosModule {}
