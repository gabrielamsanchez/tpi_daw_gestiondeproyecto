import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. Importamos TypeORM
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';

// 2. Importamos las entidades que necesita tu servicio
import { Cliente } from '../clientes/entities/cliente.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Tarea } from '../tareas/entities/tarea-entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // 3. MAGIA ACÁ: Registramos las tablas en los imports del módulo
  imports: [TypeOrmModule.forFeature([Cliente, Proyecto, Tarea]), JwtModule],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}
