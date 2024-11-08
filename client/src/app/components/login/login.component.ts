import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AlertaService } from '../../services/alertas/alerta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  message: string = '';
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    // Cargar el SDK de Facebook
    this.loadFacebookSDK();
  }

  // Método para el inicio de sesión con usuario y contraseña
  login() {
    this.loginService.login(this.usuario, this.contrasena).subscribe(
      (response) => {
        if (response.success) {
          this.message = 'Inicio de sesión exitoso';
          this.loginService.setCurrentUser(response.usuario);
          this.alertaService.showNotification('Inicio de sesión exitoso', 'success');

          // Redirigir según el rol del usuario
          if (response.usuario.tipo_Usuario.toLowerCase() === 'admin') {
            this.router.navigate(['/menu']);
          } else {
            this.router.navigate(['/cortedecaja']);
          }
        } else {
          this.message = response.message;
          this.alertaService.showNotification(response.message, 'error');
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.message = 'Error al iniciar sesión';
        this.alertaService.showNotification('Error al iniciar sesión', 'error');
        console.error(error);
        this.errorMessage = error.error?.message || 'Error desconocido';
      }
    );
  }

  // Método simplificado para iniciar sesión con Facebook
  loginWithFacebook(): void {
    // Redirige directamente al backend para manejar la autenticación de Facebook
    window.location.href = 'http://localhost:3000/auth/facebook';
  }

  // Método para cargar el SDK de Facebook
  private loadFacebookSDK(): void {
    const d = document;
    const s = 'script';
    const id = 'facebook-jssdk';
    const fjs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) { return; }

    const js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement;
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";

    if (fjs && fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    }
  }

  // Otros métodos de navegación
  pedido() {
    this.router.navigate(['/ubicacion']);
  }

  redes() {
    this.router.navigate(['/redes-sociales']);
  }

  clima() {
    this.router.navigate(['/weather']);
  }

  cocteles() {
    this.router.navigate(['/cocktail']);
  }

  musica() {
    this.router.navigate(['/spotify']);
  }

  chat() {
    this.router.navigate(['/chat']);
  }

  busqueda() {
    this.router.navigate(['/buscador']);
  }
}
