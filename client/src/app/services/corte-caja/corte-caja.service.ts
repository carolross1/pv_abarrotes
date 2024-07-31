import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorteDeCajaReporte } from '../../models/CorteCaja';

@Injectable({
  providedIn: 'root'
})
export class CorteCajaService {
  private apiUrl = 'http://localhost:3000/api/cortecaja/corteCaja'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

  getCorteDeCaja(id_Usuario: string, fecha: string): Observable<CorteDeCajaReporte> {
    return this.http.post<CorteDeCajaReporte>(this.apiUrl, { id_Usuario, fecha });
  }
}
