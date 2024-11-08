import { Component } from '@angular/core';
import { SearchService } from '../../app/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm: string = '';
  searchTermCustom: string = '';
  customSearchResults: any[] = [];

  constructor(private searchService: SearchService, private router: Router) {} // Corrección: Cambiado el nombre del parámetro a searchService

  // Método para buscar en Google Custom Search API
  searchCustom(): void {
    if (this.searchTermCustom) {
      this.searchService.search(this.searchTermCustom).subscribe(
        (data: any) => { // Corrección: Tipo any especificado
          this.customSearchResults = data.items || [];
        },
        (error: any) => { // Corrección: Tipo any especificado
          console.error('Error en la búsqueda personalizada:', error);
        }
      );
    }
  }
    // Método para manejar el cierre de sesión o regresar al login
    logout() {
      // Redirige al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
    }
}