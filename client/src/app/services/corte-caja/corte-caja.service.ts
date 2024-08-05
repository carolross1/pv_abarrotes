import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorteDeCajaReporte } from '../../models/CorteCaja';

@Injectable({
  providedIn: 'root'
})
export class CorteCajaService {
  private apiUrl = 'http://localhost:3000/api/cortecaja'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

 /* verificarCorteInicial(id_Usuario: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verificar-inicial/${id_Usuario}`);
  }*/

  registrarMontoInicial(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/corte-inicial`, data);
  }

  registrarCorteParcial(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/corte-parcial`, data);
  }

  registrarCorteFinal(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/corte-final`, data);
  }

  /*getCorteDeCaja(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get-corte-de-caja`, data);
  }*/
  /*obtenerMontoEnCaja(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/monto-caja`, data);
  }*/
}