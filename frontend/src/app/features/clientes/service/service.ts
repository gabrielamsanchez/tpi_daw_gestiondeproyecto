import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfaceCliente, EstadoCliente } from '../../../core/interfaces/interface-cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'clientes'; // Ajustá el puerto según tu Nest

  getClientes(): Observable<InterfaceCliente[]> {
    return this.http.get<InterfaceCliente[]>(this.apiUrl);
  }

  createCliente(cliente: Omit<InterfaceCliente, 'id'>): Observable<InterfaceCliente> {
    return this.http.post<InterfaceCliente>(this.apiUrl, cliente);
  }

  updateCliente(id: number, cliente: Partial<InterfaceCliente>): Observable<InterfaceCliente> {
    // Usamos PATCH de forma explícita
    return this.http.patch<InterfaceCliente>(`${this.apiUrl}/${id}`, cliente);
  }
}
