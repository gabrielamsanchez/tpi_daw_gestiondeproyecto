import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoUsuario } from '../../enum/estado-usurio.enum';
import { ApiProperty } from '@nestjs/swagger'; 

@Entity({ name: 'usuarios' })
export class Usuario {
  @ApiProperty({
    description: 'ID único autoincremental del usuario',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    description: 'Nombre de usuario utilizado para el inicio de sesión',
    example: 'admin_dev',
  })
  @Column()
  nombre!: string;

  @Column()
  clave!: string;

  @ApiProperty({
    description: 'Estado actual del usuario dentro del sistema',
    enum: EstadoUsuario,
    example: EstadoUsuario.ACTIVO,
  })
  @Column({ type: 'enum', enum: EstadoUsuario })
  estado!: EstadoUsuario;
}
