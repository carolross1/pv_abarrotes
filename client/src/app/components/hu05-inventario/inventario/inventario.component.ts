import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'] // Cambiado de styleUrl a styleUrls
})
export class InventarioComponent {
  dropdownOpen: { [key: string]: boolean } = {}; // Estado de los menús desplegables
  
  toggleDropdown(key: string): void {
    // Primero, cerrar cualquier otro desplegable que esté abierto
    for (const dropdownKey in this.dropdownOpen) {
      if (dropdownKey !== key) {
        this.dropdownOpen[dropdownKey] = false;
      }
    }
    // Alternar el estado del desplegable actual
    this.dropdownOpen[key] = !this.dropdownOpen[key];
  }

  
  // Inyecta el Router en el constructor
  constructor(private router: Router) {}

  // Define el método redirectTo que utiliza el Router para navegar a la URL proporcionada
  redirectTo(url: string): void {
    this.router.navigate([url]);
  }
}