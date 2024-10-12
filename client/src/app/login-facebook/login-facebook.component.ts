import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importar HttpClient para la comunicación con el backend
declare const FB: any;

@Component({
  selector: 'app-login-facebook',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.css'] // corregir styleUrl a styleUrls
})
export class LoginFacebookComponent implements OnInit {

  constructor(private http: HttpClient) { }  // Injectar HttpClient

  ngOnInit(): void {
    // Inicializa el SDK de Facebook
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId     : '1216560302949893',  // Reemplaza con tu App ID de Facebook
        cookie    : true,  // Habilitar cookies para rastrear la sesión
        xfbml     : true,  // Procesar los botones de redes sociales
        version   : 'v21.0'  // Asegúrate de usar la versión correcta de la API
      });
      FB.AppEvents.logPageView();
    };

    // Cargar el SDK de Facebook
    this.loadFacebookSDK();
  }

  // Método para manejar el login con Facebook
  loginWithFacebook(): void {
    FB.login((response: any) => {
      if (response.authResponse) {
        console.log('Login successful! Fetching user information...');
        FB.api('/me', { fields: 'name,email' }, (userInfo: any) => {
          console.log('User information: ', userInfo);
          // Llamada al backend con los datos del usuario
          this.sendUserInfoToBackend(userInfo);
        });
      } else {
        console.error('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });  // Asegúrate de pedir los permisos necesarios
  }

  // Método para enviar la información del usuario al backend
  sendUserInfoToBackend(userInfo: any): void {
    const backendUrl = 'http://localhost:3000/api/login-facebook';  // Cambia la URL al endpoint de tu backend
    this.http.post(backendUrl, userInfo).subscribe(
      response => {
        console.log('User information sent to backend successfully:', response);
      },
      error => {
        console.error('Error sending user information to backend:', error);
      }
    );
  }

  // Método para cargar el SDK de Facebook
  private loadFacebookSDK(): void {
    const d = document;
    const s = 'script';
    const id = 'facebook-jssdk';
    const fjs = d.getElementsByTagName(s)[0];
    
    if (d.getElementById(id)) { return; }

    const js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement; // Corregido a HTMLScriptElement
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    
    if (fjs && fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);  // Asegurar que fjs no sea null
    }
  }
}
