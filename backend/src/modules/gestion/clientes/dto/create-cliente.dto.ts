import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EstadoCliente } from '../enum/estado-cliente-enum';

export class CreateClienteDto {
  @ApiProperty({ description: 'Nombre único del cliente', example: 'Empresa S.A.' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ description: 'Estado actual del cliente', enum: EstadoCliente, example: EstadoCliente.ACTIVO })
  @IsEnum(EstadoCliente, { message: 'El estado debe ser ACTIVO o BAJA' })
  @IsNotEmpty()
  estado!: EstadoCliente;
}
