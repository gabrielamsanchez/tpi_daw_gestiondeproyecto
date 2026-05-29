import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { TareasModule } from './tareas/tareas.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule, ClientesModule, ProyectosModule, TareasModule],
})
export class GestionModule {}
