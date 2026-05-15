import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import { EstadoTarea } from '../../enum/estado-tareas-enum';

export class CreateTareaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsEnum(EstadoTarea)
  estado!: EstadoTarea;

  @IsInt()
  @IsNotEmpty()
  id_proyecto!: number;
}
