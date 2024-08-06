import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-frecuentes',
  templateUrl: './clientes-frecuentes.component.html',
  styleUrls: ['./clientes-frecuentes.component.css']
})
export class ClientesFrecuentesComponent {
  // Objeto para mantener el estado de los desplegables
  dropdownOpen: { [key: string]: boolean } = {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

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

  verListaClientes(): void {
    this.router.navigate(['/listaclientesf']);
  }
}
