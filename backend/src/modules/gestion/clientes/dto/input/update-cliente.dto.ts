import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EstadosClientesEnum } from '../../enum/estados-cliente-enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @ApiProperty({enum: EstadosClientesEnum, default: EstadosClientesEnum.ACTIVO})
    @IsEnum(EstadosClientesEnum, {message: `El estado debe ser uno de los siguientes: ${Object.values(EstadosClientesEnum).join(', ')}`})
    @IsOptional()
    estado!: EstadosClientesEnum;
}
