import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
export interface LogoutResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api/login';

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, contrasena: string): Observable<any> {
    const body = { usuario, contrasena };
    return this.http.post<any>(this.apiUrl, body);
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
   logout(): boolean {
    // Verificar si el usuario ha realizado un corte final
 const estadoCorte = localStorage.getItem('estadoCorte');
    if (estadoCorte && estadoCorte !== 'final') {
      alert('No puedes cerrar sesión sin realizar un corte final. REALIZA EL CORTE ANTES DE SALIR');
      this.router.navigate(['/cortedecaja']);
      return false; // Indica que el logout no se realizó
     
  }
 
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
    return true; // Indica que el logout se realizó con éxito
  }
 
}