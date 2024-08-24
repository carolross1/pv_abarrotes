import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private loginService: LoginService, private router: Router) {}

  isLoggedIn(): Observable<boolean> {
    // Verifica si el usuario está autenticado usando LoginService
    return of(this.loginService.getCurrentUser() !== null);
  }

  getUserType(): Observable<string> {
    // Obtén el tipo de usuario desde LoginService
    const currentUser = this.loginService.getCurrentUser();
    return of(currentUser ? currentUser.tipo_Usuario : '');
  }

  handleAuthRedirect(): Observable<boolean> {
    this.router.navigate(['/login']);
    return of(false);
  }
}
