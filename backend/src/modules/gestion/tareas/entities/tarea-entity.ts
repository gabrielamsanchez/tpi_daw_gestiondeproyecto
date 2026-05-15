// import {
//   Column,
//   Entity,
//   //JoinColumn,
//  // ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoTarea } from '../enum/estado-tareas-enum';
//esto despues hay que descomentarlo
//import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity({ name: 'tareas' })
export class Tarea {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ type: 'varchar', length: 255 }) description!: string;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoTarea,
    default: EstadoTarea.PENDIENTE,
  })
  estado!: EstadoTarea;

  //esto es momentaneo hasta terminar proyecto
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
