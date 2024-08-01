import { Component } from '@angular/core';

@Component({
  selector: 'app-entregas-proveedor',
  templateUrl: './entregas-proveedor.component.html',
  styleUrls: ['./entregas-proveedor.component.css']
})
export class EntregasProveedorComponent {

  // Propiedad para manejar el estado de los desplegables
  dropdownOpen: { [key: string]: boolean } = {
    'ventas-compras': false,
    'proveedores-entregas': false,
    'inventarios-reportes': false,
    'otros': false
  };

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
