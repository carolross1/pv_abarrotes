import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MapComponent } from '../map-component/map-component.component';  // Asegúrate de la ruta correct

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
    notas: string = '';  // Añadir esta línea
  dropdownOpen: { [key: string]: boolean } = {}; // Control de desplegables

  constructor(private router: Router) {}

  // Método para confirmar el pedido
  confirmarPedido() {
    if (!this.direccion || !this.metodoPago) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Lógica para manejar la información del pedido (puede incluir la lógica para enviar a un backend o procesar el pedido)
    console.log('Confirmando pedido...');
    console.log('Dirección:', this.direccion);
    console.log('Método de pago:', this.metodoPago);

    // Redirigir a una página de confirmación de pedido o a otra página según el flujo de la aplicación
    this.router.navigate(['/confirmacion-pedido']);
  }

  // Método para alternar el estado de los desplegables
  toggleDropdown(key: string) {
    // Primero, cerrar cualquier otro desplegable que esté abierto
    for (const dropdownKey in this.dropdownOpen) {
      if (dropdownKey !== key) {
        this.dropdownOpen[dropdownKey] = false;
      }
    }
    // Alternar el estado del desplegable actual
    this.dropdownOpen[key] = !this.dropdownOpen[key];
  }

  // Método de cierre de sesión
  logout() {
    console.log('Cerrando sesión...');
    // Aquí iría la lógica para cerrar sesión, por ejemplo, redirigir a la pantalla de login
    this.router.navigate(['/login']);
  }
}
