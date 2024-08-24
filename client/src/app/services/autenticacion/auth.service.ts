import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,of } from 'rxjs';
import { Usuario} from '../../models/Usuario';
import { catchError,map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  user$: Observable<Usuario | null> = this.userSubject.asObservable();

  constructor() {
    this.loadUser();
  }

  private loadUser(): void {
    const user: Usuario | null = this.getUserFromLocalStorage();
    this.userSubject.next(user);
  }

  private getUserFromLocalStorage(): Usuario | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      console.log('Usuario desde localStorage:', userJson);
      return JSON.parse(userJson);
    }
    return null;
  }

  login(email: string, contrasena: string): Observable<boolean> {
    // Simula una autenticación real
    return of(true).pipe(
      map(() => {
        const user: Usuario = {
          id_Usuario: '',
          nombre: '',
          contrasena: contrasena,
          apellido: '',
          telefono: '',
          email: email,
          tipo_Usuario: 'Admin' // O 'EMPLOYEE'
        };
        console.log('Usuario autenticado:', user); // Verifica los datos del usuario
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  getUserType(): Observable<string | null> {
    return this.user$.pipe(
      map(user => user ? user.tipo_Usuario : null),
      catchError(() => of(null))
    );
  }
}