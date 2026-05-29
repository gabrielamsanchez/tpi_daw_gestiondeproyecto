import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './services/clientes.service';
import { ClienteController } from './controllers/clientes.controller';
import { Cliente } from './entities/cliente.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), JwtModule],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClientesModule {}
