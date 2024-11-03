/* import { Component, OnInit } from '@angular/core';
declare const FB: any;

@Component({
  selector: 'app-login-facebook',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.css']
})
export class LoginFacebookComponent implements OnInit {

  ngOnInit(): void {
    // Inicializa el SDK de Facebook
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId     : '1216560302949893',  // Reemplaza con tu App ID de Facebook
        cookie    : true,                 // Habilitar cookies para rastrear la sesión
        xfbml     : true,                 // Procesar los botones de redes sociales
        version   : 'v21.0'               // Asegúrate de usar la versión correcta de la API
      });
      FB.AppEvents.logPageView();
    };

    // Cargar el SDK de Facebook
    this.loadFacebookSDK();
  }

  // Método para manejar el login con Facebook, redirigiendo al backend para autenticación
  loginWithFacebook(): void {
    window.location.href = 'http://localhost:3000/auth/facebook'; // Redirige al backend para autenticación con Facebook
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
}
 */