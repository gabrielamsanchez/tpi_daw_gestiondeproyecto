import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioServiceService } from './usuario-service/usuario-service.service';
import { Usuario } from './entities/input/usuario-entities';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioServiceService],
  exports: [UsuarioServiceService],
})
export class UsuariosModule {}
