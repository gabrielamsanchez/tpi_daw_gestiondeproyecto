import { Module } from '@nestjs/common';
import { GestionModule } from './modules/gestion/gestion.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasModule } from './modules/gestion/tareas/tareas.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/auth/usuarios/usuarios.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: false, pa que ande
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    UsuariosModule,
    TareasModule,
    GestionModule,
  ],
})
export class AppModule {}
