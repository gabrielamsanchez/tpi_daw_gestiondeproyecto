export class CreateClienteDto {
  nombre!: string;
  estado!: 'ACTIVO' | 'BAJA';
}