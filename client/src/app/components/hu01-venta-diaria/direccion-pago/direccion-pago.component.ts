import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MapComponent } from '../map-component/map-component.component';  // Asegúrate de la ruta correcta

@Component({
  selector: 'app-direccion-pago',
  templateUrl: './direccion-pago.component.html',
  styleUrls: ['./direccion-pago.component.css']
})
export class DireccionPagoComponent {
  direccion: string = '';
  metodoPago: string = '';
  nombreCliente: string = '';
  telefono: string = '';
  productos: string = '';
  notas: string = ''; 
  dropdownOpen: { [key: string]: boolean } = {}; 

  @ViewChild(MapComponent) mapComponent!: MapComponent; // Referencia al componente del mapa

  constructor(private router: Router) {}

  confirmarPedido() {
    if (!this.direccion || !this.metodoPago) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Calcular la ruta después de confirmar el pedido
    this.mapComponent.direccion = this.direccion; // Pasar la dirección al componente del mapa
    this.mapComponent.calculateRouteToDireccion(); // Calcular la ruta

    console.log('Confirmando pedido...');
    console.log('Dirección:', this.direccion);
    console.log('Método de pago:', this.metodoPago);

    this.router.navigate(['/confirmacion-pedido']);
  }

  toggleDropdown(key: string) {
    for (const dropdownKey in this.dropdownOpen) {
      if (dropdownKey !== key) {
        this.dropdownOpen[dropdownKey] = false;
      }
    }
    this.dropdownOpen[key] = !this.dropdownOpen[key];
  }

  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}
