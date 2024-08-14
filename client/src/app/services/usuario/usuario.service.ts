import { Injectable } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // Cambia la URL a la de tu backend

  constructor(private http: HttpClient) { }

  // Crear un nuevo usuario
  createUser(user: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, user);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }

  // Obtener un usuario por ID
  getUser(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un usuario
  updateUser(id_Usuario: string,user:Usuario): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id_Usuario}`, user);
  }

  // Eliminar un usuario
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}