import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/auth/usuarios/usuarios.module';
import { GestionModule } from './modules/gestion/gestion.module';
import { TareasModule } from './modules/gestion/tareas/tareas.module';
import { ClientesModule } from './modules/gestion/clientes/clientes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    AuthModule,
    ClientesModule,
    UsuariosModule,
    //ClientesModule,
    TareasModule,
    GestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
