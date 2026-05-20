import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
    JoinColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity({ name: 'proyecto' })
export class Proyecto {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', unique: true, nullable: false })
  nombre!: string;

  @Column({
    type: 'enum',
    enum: ['ACTIVO', 'BAJA'],
    default: 'ACTIVO',
  })
  estado!: string;

  // id_cliente INT + CONSTRAINT fk_proyectos_cliente
  // Relación Muchos a Uno: Muchos proyectos pueden pertenecer a un cliente
  @ManyToOne(() => Cliente, (cliente) => cliente.proyectos, {
    nullable: true, // Porque en tu SQL id_cliente no tiene un NOT NULL explicitado
  })
  @JoinColumn({ name: 'id_cliente' }) // Especificamos el nombre exacto de la columna FK
  cliente!: Cliente;

  // (Opcional) Si necesitas acceder al id_cliente directamente sin cargar toda la relación
  @Column({ type: 'int', nullable: true })
  id_cliente!: number;
}
