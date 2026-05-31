import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioServiceService } from './usuario-service/usuario-service.service';
import { Usuario } from './entities/input/usuario-entities';
import { UsuariosController } from './controllers/usuarios.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuarioServiceService],
  exports: [UsuarioServiceService, TypeOrmModule],
})
export class UsuariosModule {}
