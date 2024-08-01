import { Component } from '@angular/core';

@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html',
  styleUrls: ['./descuento.component.css'] // Corregido a 'styleUrls'
})
export class DescuentoComponent {
  dropdownOpen: { [key: string]: boolean } = {};

  // Método para alternar el estado de los desplegables
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
}
