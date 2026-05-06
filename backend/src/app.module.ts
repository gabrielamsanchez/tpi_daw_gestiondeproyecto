import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GestionModule } from './modules/gestion/gestion.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [GestionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
