import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/Proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private API_URI = 'http://localhost:3000/proveedores';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.API_URI);
  }

  getProveedor(id_Proveedor: string): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.API_URI}/${id_Proveedor}`);
  }

  saveProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.API_URI, proveedor);
  }

  updateProveedor(id_Proveedor: string, updatedProveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.API_URI}/${id_Proveedor}`, updatedProveedor);
  }

  deleteProveedor(id_Proveedor: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URI}/${id_Proveedor}`);
  }
}
