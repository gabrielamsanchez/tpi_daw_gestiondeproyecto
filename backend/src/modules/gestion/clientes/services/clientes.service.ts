// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// //import { CreateClienteDto } from './dto/create-cliente.dto';
// //import { UpdateClienteDto } from './dto/update-cliente.dto';
// //import { Cliente } from './entities/cliente.entity';

// @Injectable()
// export class ClienteService {
//   constructor(
//     @InjectRepository(Cliente)
//     private readonly clienteRepository: Repository<Cliente>,
//   ) {}

//   async create(createClienteDto: CreateClienteDto) {
//     const nuevoCliente = this.clienteRepository.create(createClienteDto);
//     return await this.clienteRepository.save(nuevoCliente);
//   }

//   async findAll() {
//     return await this.clienteRepository.find();
//   }

//   async findOne(id: number) {
//     const cliente = await this.clienteRepository.findOne({ where: { id } });
//     if (!cliente) {
//       throw new NotFoundException(`El cliente con ID ${id} no existe`);
//     }
//     return cliente;
//   }

//   async update(id: number, updateClienteDto: UpdateClienteDto) {
//     const cliente = await this.findOne(id);
//     this.clienteRepository.merge(cliente, updateClienteDto);
//     return await this.clienteRepository.save(cliente);
//   }

//   async remove(id: number) {
//     const cliente = await this.findOne(id);
//     cliente.estado = 'BAJA';
//     return await this.clienteRepository.save(cliente);
//   }
// }
