import { Module } from '@nestjs/common';
//import { ClienteModule } from './clientes/clientes.module';
//import { ProyectosModule } from './proyectos/proyectos.module';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [TareasModule],
})
export class GestionModule {}
