import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { ClienteService } from '../clientes/services/clientes.service';
//import { ClienteController } from '../clientes/controllers/clientes.controller';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [],
  providers: [],
})
export class ClienteModule {}
