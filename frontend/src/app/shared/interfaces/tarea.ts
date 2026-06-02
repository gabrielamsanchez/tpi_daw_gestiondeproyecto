export interface Tarea {
    id: string;
    descripcion: string; 
    estado: string; 
    id_proyecto: number;
}

export interface TareaPayload {
  descripcion: string;
  estado: string;
  id_proyecto: number;
}
