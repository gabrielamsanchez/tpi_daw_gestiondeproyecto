import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EstadoUsuario } from '../../../auth/usuarios/enum/estado-usurio.enum';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre único del usuario',
    example: 'juan_perez',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Segura123!',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La clave debe tener al menos 6 caracteres' })
  clave!: string;

  @ApiProperty({
    description: 'Estado actual del usuario',
    enum: EstadoUsuario,
    example: EstadoUsuario.ACTIVO,
  })
  @IsEnum(EstadoUsuario, {
    message: 'El estado debe ser un valor válido de estados_usuarios',
  })
  @IsNotEmpty()
  estado!: EstadoUsuario;
}
