import { ApiProperty } from '@nestjs/swagger';
import { EstadoTarea } from '../../enum/estado-tareas-enum';

export class ListTareaDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  descripcion!: string;

  @ApiProperty()
  estado!: EstadoTarea;
}
