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
  baseUrl = 'https://api.spotify.com/v1';
  scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private'
  ];

  accessToken: string | null = null;
  playlists: any[] = [];
  searchResults: any[] = []; // Almacena resultados de la búsqueda
  searchTerm: string = ''; // Término de búsqueda ingresado por el usuario
  previewUrl: SafeResourceUrl | null = null;

  // URL del podcast predeterminado
  defaultPodcastUrl = 'https://open.spotify.com/embed/show/5u3YBwEv56j3sRKtTAxUOd?si=1a8768b1e32f4ef6';



  constructor(
    private http: HttpClient, 
    private router: Router, 
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.checkAccessToken();
    this.showDefaultPodcast(); // Muestra el podcast predeterminado al iniciar
  }

  // Método para mostrar el podcast predeterminado
  showDefaultPodcast() {
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.defaultPodcastUrl);
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
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
      this.getUserPlaylists();
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

  search() {
    if (this.accessToken && this.searchTerm) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}`
      });
  
      this.http.get(`${this.baseUrl}/search?q=${encodeURIComponent(this.searchTerm)}&type=playlist,track&limit=10`, { headers })
        .subscribe(
          (response: any) => {
            this.searchResults = response.playlists.items.concat(response.tracks.items); // Combina resultados de playlists y tracks
            console.log('Resultados de búsqueda:', this.searchResults);
          },
          error => {
            console.error('Error en la búsqueda:', error);
          }
        );
    }
  }
  

  showPreview(spotifyUrl: string) {
    const previewId = spotifyUrl.split('/').pop();
    const unsafeUrl = `https://open.spotify.com/embed/playlist/${previewId}`;
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
