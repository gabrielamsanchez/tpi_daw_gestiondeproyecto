import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../entities/cliente.entity'; 
import { generarArchivoCsv } from '../../../../../common/utils/csv-generator.util'; 
import { EstadoCliente } from '../../enum/estado-cliente-enum'; 

@Injectable()
export class ClientesExportService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async exportarClientesCsv(estado?: EstadoCliente): Promise<string> {
    // Si viene estado filtramos por él, si no, traemos todos
    const condicionWhere = estado ? { estado } : {};

    const clientes = await this.clienteRepository.find({
      where: condicionWhere,
      order: { id: 'ASC' },
    });
    console.log('--- DATOS DESDE TYPEORM ---');
    console.log(clientes);

    const encabezados = [
      'ID',
      'Nombre',
      'Estado',
      'Teléfono',
      'Correo Electrónico',
    ];

    const matrizDeDatos = clientes.map((c) => [
      c.id,
      c.nombre,
      c.estado,
      c.telefono || 'N/A',
      c.correo || 'N/A',
    ]);
    console.log('--- MATRIZ MAPAEDA ---');
    console.log(matrizDeDatos);

    return generarArchivoCsv(encabezados, matrizDeDatos);
  }
}
