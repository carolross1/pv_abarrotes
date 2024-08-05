import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../../models/Venta';
import { DetalleVenta } from '../../models/DetalleVenta';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:3000/api/ventas';  // Actualiza la URL según tu configuración

  constructor(private http: HttpClient) { }
  registrarVenta(venta: Omit<Venta, 'id_Venta'>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, venta)
      .pipe(
        tap(response => console.log('Respuesta del servidor al registrar venta:', response)),
        //GUARDAR EL dATo de id_venta y el id producto en una variable
        catchError(error => {
          console.error('Error al registrar venta:', error);
          return throwError(error);
        })
      );
  }

  registrarDetalles(detalles: DetalleVenta[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/detalle/create`, detalles)
      .pipe(
        tap(response => console.log('Respuesta del servidor al registrar detalles de venta:', response)),
        catchError(error => {
          console.error('Error al registrar detalles de venta: dddd', error);
          return throwError(error);
        })
      );
  }
}