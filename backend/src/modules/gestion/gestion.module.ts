import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { ProyectosModule } from './proyectos/proyectos.module';

@Module({
  imports: [ClientesModule, ProyectosModule]
})
export class GestionModule {}
