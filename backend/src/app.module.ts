import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GestionModule } from './modules/gestion/gestion.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ClientesModule } from './modules/gestion/clientes/clientes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    ClientesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
