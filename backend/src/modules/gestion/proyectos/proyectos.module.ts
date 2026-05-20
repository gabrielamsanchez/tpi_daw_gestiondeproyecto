import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { ProyectosService } from './services/proyectos.service';
import { ProyectosController } from './controllers/proyectos.controller';
import { JwtModule } from '@nestjs/jwt'; // <-- 1. Importa esto
@Module({
  imports: [TypeOrmModule.forFeature([Proyecto]), JwtModule],

  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
