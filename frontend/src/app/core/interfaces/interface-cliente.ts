// export enum EstadoCliente {
//   ACTIVO = 'ACTIVO',
//   BAJA = 'BAJA'
// }

export interface InterfaceCliente {
  id: number; // Numérico para PostgreSQL
  nombre: string;
  estado: string;
  telefono?: string;
  correo?: string;
}
