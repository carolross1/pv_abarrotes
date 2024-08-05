import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

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
  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('estadoCorte');
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
