import { Module } from '@nestjs/common';
import { ClienteModule } from './clientes/clientes.module';
import { ProyectosModule } from './proyectos/proyectos.module';

@Module({
  imports: [ClienteModule, ProyectosModule],
})
export class GestionModule {}
