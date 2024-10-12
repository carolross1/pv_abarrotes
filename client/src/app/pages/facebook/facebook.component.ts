import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css'] // Cambié styleUrl a styleUrls
})
export class FacebookComponent implements OnInit {
  constructor(private router: Router) { } // Inyección del Router

  ngOnInit(): void {
    this.loadFacebookSDK();
  }

  // Método para manejar el cierre de sesión o regresar al login
  logout() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  loadFacebookSDK() {
    if ((<any>window).FB) {
      // El SDK ya está cargado
      (<any>window).FB.XFBML.parse();
    } else {
      // Cargar el SDK de Facebook
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      script.onload = () => {
        (<any>window).FB.init({
          appId: '1216560302949893', // Reemplaza con tu ID de aplicación
          xfbml: true,
          version: 'v21.0'
        });
      };
    }
  }
}
