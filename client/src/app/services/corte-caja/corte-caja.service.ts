import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorteCaja } from '../../models/CorteCaja';




@Injectable({
  providedIn: 'root'
})
export class CorteCajaService {

  private apiUrl = 'http://localhost:3000/api/cortecaja'; 

  constructor(private http: HttpClient) { }


  iniciarCorte(corte: Partial<CorteCaja>): Observable<any> {
    return this.http.post(`${this.apiUrl}/iniciar-corte`, corte);
  }
 
  cerrarCorte(corte: { id_Corte: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/cerrar-corte`, corte);
  }

  obtenerCorteActual(): Observable<CorteCaja> {
    return this.http.get<CorteCaja>(`${this.apiUrl}/corte-actual`);
  }
  obtenerCorteAbierto(id_Usuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/corte-abierto/${id_Usuario}`);
}

/*logout(): void {
  const currentUser = this.loginService.getCurrentUser();
  const id_Usuario = currentUser.id_Usuario;

  this.obtenerCorteAbierto(id_Usuario).subscribe(
      response => {
          if (response && response.id_Corte) {
              alert('No puedes cerrar sesión sin realizar el corte de caja. Por favor, cierra el corte antes de salir.');
          } else {
              this.loginService.logout().subscribe(
                  logoutResponse => {
                      if (logoutResponse.success) {
                          console.log('Cierre de sesión realizado correctamente.');
                          this.router.navigate(['/login']);
                      } else {
                          alert('Error al realizar el cierre de sesión.');
                      }
                  },
                  (error: HttpErrorResponse) => {
                      console.error('Error al cerrar sesión:', error);
                      alert('Ocurrió un error al realizar el cierre de sesión.');
                  }
              );
          }
      },
      (error: HttpErrorResponse) => {
          if (error.status === 404) {
              this.loginService.logout().subscribe(
                  logoutResponse => {
                      if (logoutResponse.success) {
                          console.log('Cierre de sesión realizado correctamente.');
                          this.router.navigate(['/login']);
                      } else {
                          alert('Error al realizar el cierre de sesión.');
                      }
                  },
                  (error: HttpErrorResponse) => {
                      console.error('Error al cerrar sesión:', error);
                      alert('Ocurrió un error al realizar el cierre de sesión.');
                  }
              );
          } else {
              console.error('Error al verificar el estado del corte de caja:', error);
              alert('Ocurrió un error al verificar el estado del corte de caja.');
          }
      }
  );
}

private handleError(error: HttpErrorResponse) {
  console.error('Ocurrió un error:', error);
  return throwError(() => new Error('Error en la solicitud.'));
}*/

}

