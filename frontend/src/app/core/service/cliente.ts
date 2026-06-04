import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfaceCliente } from '../interfaces/interface-cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);

  // CORRECCIÓN 3: Dejamos la URL relativa para que pase obligatoriamente por el proxy.conf.json
  // e inyecte las cabeceras/tokens del interceptor de forma automática.
  private apiUrl = 'api/v1/clientes';

  getClientes(): Observable<InterfaceCliente[]> {
    return this.http.get<InterfaceCliente[]>(this.apiUrl);
  }

  createCliente(cliente: Omit<InterfaceCliente, 'id'>): Observable<InterfaceCliente> {
    return this.http.post<InterfaceCliente>(this.apiUrl, cliente);
  }

  updateCliente(id: number, cliente: Partial<InterfaceCliente>): Observable<InterfaceCliente> {
    // Pegamos a /api/v1/clientes/:id mandando solo las propiedades del body limpias
    return this.http.patch<InterfaceCliente>(`${this.apiUrl}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
