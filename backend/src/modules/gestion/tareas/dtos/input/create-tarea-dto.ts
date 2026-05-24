import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { EstadoTarea } from '../../enum/estado-tareas-enum';

export class CreateTareaDto {
  @ApiProperty({
    description: 'Descripción de la tarea a realizar',
    example: 'Modelar las tablas de la base de datos en PostgreSQL',
  })
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @ApiProperty({
    description: 'Estado actual de la tarea',
    enum: EstadoTarea,
    example: EstadoTarea.PENDIENTE,
  })
  @IsEnum(EstadoTarea)
  @IsOptional()
  estado!: EstadoTarea;

  @ApiProperty({
    description: 'ID del proyecto',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  id_proyecto!: number;
}
