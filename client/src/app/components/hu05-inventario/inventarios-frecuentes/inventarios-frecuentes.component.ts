import { Component } from '@angular/core';

@Component({
  selector: 'app-inventarios-frecuentes',
  templateUrl: './inventarios-frecuentes.component.html',
  styleUrls: ['./inventarios-frecuentes.component.css']
})
export class InventariosFrecuentesComponent {
  categorias = ['Categoría 1', 'Categoría 2', 'Categoría 3']; // Agrega más categorías según sea necesario
  categoriaSeleccionada: number = -1;

  // Definir el estado de los menús desplegables
  dropdownOpen: { [key: string]: boolean } = {
    inventarios: false,
    usuarios: false
  };

  seleccionarCategoria(index: number) {
    this.categoriaSeleccionada = index === this.categoriaSeleccionada ? -1 : index;
  }

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
