import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  clientId = 'bcea41b2a1404bb0b43af3c8312a25fa'; // Reemplaza con tu Client ID
  clientSecret = '207a638d6b3945dc8f633d0e001f7c73'; // Reemplaza con tu Client Secret
  redirectUri = 'http://localhost:4200/callback'; // Reemplaza con tu URL de redirección
  authEndpoint = 'https://accounts.spotify.com/authorize';
  baseUrl = 'https://api.spotify.com/v1'; // URL base para la API de Spotify
  scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private'
  ];

  accessToken: string | null = null;
  playlists: any[] = [];
  previewUrl: SafeResourceUrl | null = null; // URL segura para el reproductor embebido

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private sanitizer: DomSanitizer // Inyecta el servicio DomSanitizer
  ) { }

  ngOnInit(): void {
    this.checkAccessToken();
  }

  loginWithSpotify() {
    const authUrl = `${this.authEndpoint}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scopes.join('%20')}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  }

  checkAccessToken() {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      const params = new URLSearchParams(hash.replace('#', ''));
      this.accessToken = params.get('access_token');
      console.log('Access Token:', this.accessToken);
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
      this.getUserPlaylists(); // Obtener playlists después de autenticar
    }
  }

  getUserPlaylists(limit: number = 50, offset: number = 0) {
    if (this.accessToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}`
      });

      this.http.get(`${this.baseUrl}/me/playlists?limit=${limit}&offset=${offset}`, { headers })
        .subscribe(
          (response: any) => {
            this.playlists.push(...response.items);
            console.log('Playlists obtenidas:', this.playlists);
            if (response.total > this.playlists.length) {
              this.getUserPlaylists(limit, offset + limit);
            }
          },
          error => {
            console.error('Error obteniendo las playlists:', error);
          }
        );
    } else {
      console.error('No hay token de acceso.');
    }
  }

  // Método para mostrar el reproductor embebido de una playlist o canción, usando DomSanitizer
  showPreview(spotifyUrl: string) {
    const previewId = spotifyUrl.split('/').pop(); // Extrae el ID de la URL de Spotify
    const unsafeUrl = `https://open.spotify.com/embed/playlist/${previewId}`;
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl); // Usa DomSanitizer para hacer la URL segura
  }

  // Método para manejar el cierre de sesión o regresar al login
  logout() {
    this.router.navigate(['/login']);
  }
}
