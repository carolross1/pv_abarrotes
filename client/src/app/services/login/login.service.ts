import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CorteCajaService } from '../corte-caja/corte-caja.service';

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private apiUrl = 'http://localhost:3000/api/login';
  private facebookAuthUrl = 'http://localhost:3000/auth/facebook'; // Ruta para la autenticación de Facebook

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private corteCajaService: CorteCajaService
  ) {}

  // Método para iniciar sesión con usuario y contraseña
  login(usuario: string, contrasena: string): Observable<any> {
    const body = { usuario, contrasena };
    return this.http.post<any>(this.apiUrl, body);
  }

 // En el servicio LoginService
loginWithFacebook(accessToken: string): Observable<any> {
  const url = `${this.apiUrl}/facebook`;
  return this.http.post<any>(url, { accessToken });
}


  // Guardar el usuario actual en el BehaviorSubject
  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  // Método de cierre de sesión
  logout(): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica si hay un corte abierto antes de cerrar la sesión
    this.corteCajaService.obtenerCorteAbierto(currentUser.id_Usuario).subscribe(
      response => {
        if (response && response.id_Corte) {
          Swal.fire({
            icon: 'warning',
            title: 'Cierre de sesión no permitido',
            text: 'No puedes cerrar sesión sin realizar un corte final. REALIZA EL CORTE ANTES DE SALIR',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/cortedecaja']);
          });
          
          return false; 
        } else {
          this.finalizarSesion();
          return true;
        }
      },  
      error => {
        if (error.status === 404) {
          this.finalizarSesion();
          return true;
        } else {
          console.error('Error al verificar el estado del corte:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al verificar el estado del corte.',
            confirmButtonText: 'Aceptar'
          });
          return false;
        }
      }
    );
    return false;
  }

  private finalizarSesion(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.currentUserSubject.next(null); // Limpiar el usuario actual
    this.router.navigate(['/login']);
  }
}
