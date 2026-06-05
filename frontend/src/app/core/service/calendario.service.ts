import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private http = inject(HttpClient);
  

  private apiUrl = 'http://localhost:3000/api/v1/calendario';

  obtenerEventos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}