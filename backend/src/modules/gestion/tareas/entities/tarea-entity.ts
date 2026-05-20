// import {
//   Column,
//   Entity,
//   //JoinColumn,
//  // ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoTarea } from '../enum/estado-tareas-enum';
import { ApiProperty } from '@nestjs/swagger';
//esto despues hay que descomentarlo
//import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity({ name: 'tareas' })
export class Tarea {
  @ApiProperty({
    description: 'ID de la tarea',
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @ApiProperty({
    description: 'Descripción de la tarea a realizar',
    example: 'Modelar las tablas de la base de datos en PostgreSQL',
    maxLength: 255,
  })
  @Column({ type: 'varchar', length: 255, nullable: true }) 
  descripcion!: string;

  @ApiProperty({
    description: 'Estado actual de la tarea',
    enum: EstadoTarea,
    example: EstadoTarea.PENDIENTE,
  })
  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoTarea,
    default: EstadoTarea.PENDIENTE,
  })
  estado!: EstadoTarea;

  //esto es momentaneo
  @ApiProperty({
    description:
      'ID del proyecto asociado',
    example: 1,
    nullable: true,
  })
  @Column({ name: 'id_proyecto', type: 'int', nullable: true })
  idProyecto!: number;

  //esto despues hay que descomentarlo
  //   @Column({ name: 'proyecto_id' })
  //   idProyecto!: number;

  //   @ManyToOne(() => Proyecto, (proyectos) => proyectos.tareas, {
  //     onDelete: 'CASCADE',
  //   })
  //   @JoinColumn({ name: 'id_proyecto' })
  //   proyecto!: Proyecto;
}
