import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admn',
      password: 'admin4',
      database: 'gest',
      autoLoadEntities: true,
      synchronize: false, 
      logging: process.env.DB_LOGGING === 'true',
      logger: 'advanced-console',
    }),
  ],
  exports: [TypeOrmModule], 
})
export class DatabaseModule {}