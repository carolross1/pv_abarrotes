import { Component } from '@angular/core';

@Component({
  selector: 'app-inventarios-frecuentes',
  templateUrl: './inventarios-frecuentes.component.html',
  styleUrls: ['./inventarios-frecuentes.component.css']
})
export class InventariosFrecuentesComponent {
  categorias = ['Categoría 1', 'Categoría 2', 'Categoría 3']; // Agrega más categorías según sea necesario
  categoriaSeleccionada: number = -1;

  seleccionarCategoria(index: number) {
    this.categoriaSeleccionada = index === this.categoriaSeleccionada ? -1 : index;
  }
}