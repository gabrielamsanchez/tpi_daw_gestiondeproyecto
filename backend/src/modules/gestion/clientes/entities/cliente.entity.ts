import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
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
}
