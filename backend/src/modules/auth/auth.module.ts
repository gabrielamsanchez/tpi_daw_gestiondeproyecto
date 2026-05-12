import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TareasModule } from '../gestion/tareas/tareas.module';
import { AuthControllerController } from './auth-controller/auth-controller.controller';
import { AuthServiceService } from './auth-service/auth-service.service';

@Module({
  imports: [UsuariosModule, TareasModule],
  controllers: [AuthControllerController],
  providers: [AuthServiceService],
})
export class AuthModule {}
