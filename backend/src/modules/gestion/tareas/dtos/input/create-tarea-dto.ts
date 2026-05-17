import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import { EstadoTarea } from '../../enum/estado-tareas-enum';

export class CreateTareaDto {
  @ApiProperty({
    description: 'Descripción o cuerpo detallado de la tarea a realizar',
    example: 'Modelar las tablas de la base de datos en PostgreSQL',
  })
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @ApiProperty({
    description: 'Estado actual en el que se encuentra la tarea',
    enum: EstadoTarea,
    example: EstadoTarea.PENDIENTE,
  })
  @IsEnum(EstadoTarea)
  estado!: EstadoTarea;

  @ApiProperty({
    description: 'ID del proyecto al cual pertenece y se vinculará esta tarea',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_proyecto!: number;
}
