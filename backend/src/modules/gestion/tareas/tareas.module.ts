import { Module } from '@nestjs/common';
import { TareacontrollerController } from './tareacontroller/tareacontroller.controller';
import { TareaserviceService } from './tareaservice/tareaservice.service';

@Module({
  controllers: [TareacontrollerController],
  providers: [TareaserviceService],
})
export class TareasModule {}
