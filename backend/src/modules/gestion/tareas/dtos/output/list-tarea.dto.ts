import { ApiProperty } from '@nestjs/swagger';
import { EstadoTarea } from '../../enum/estado-tareas-enum';

export class ListTareaDto {
  @ApiProperty({
    description: 'ID único autoincremental de la tarea en la base de datos',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Detalle o cuerpo de la tarea realizada o por realizar',
    example: 'Modelar las tablas de la base de datos en PostgreSQL',
  })
  descripcion!: string;

  @ApiProperty({
    description:
      'Estado actual en el que se encuentra la tarea mapeado por el Enum',
    enum: EstadoTarea,
    example: EstadoTarea.PENDIENTE,
  })
  estado!: EstadoTarea;
}
