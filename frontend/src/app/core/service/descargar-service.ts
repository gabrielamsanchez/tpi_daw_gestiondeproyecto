import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DescargarCsvService {
    private http = inject(HttpClient);

    descargarDesdeUrl(urlEndpoint: string, nombreArchivo: string) {
        this.http.get(urlEndpoint, { responseType: 'blob' })
            .subscribe({
                next: (blob: Blob) => {
                    this.ejecutarDescargaDOM(blob, nombreArchivo);
                },
                error: (err) => {
                    console.error(`Error al descargar ${nombreArchivo}:`, err);
                }
            });
    }

    private ejecutarDescargaDOM(blob: Blob, nombreArchivo: string) {
        const urlBlob = window.URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = urlBlob;
        enlace.download = nombreArchivo;
        
        document.body.appendChild(enlace);
        enlace.click();
        
        document.body.removeChild(enlace);
        window.URL.revokeObjectURL(urlBlob);
    }
}