import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos-a-proveedor',
  templateUrl: './pedidos-a-proveedor.component.html',
  styleUrl: './pedidos-a-proveedor.component.css'
})
export class PedidosAProveedorComponent {

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