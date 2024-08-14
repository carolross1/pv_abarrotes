import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-clientes-frecuentes',
  templateUrl: './clientes-frecuentes.component.html',
  styleUrls: ['./clientes-frecuentes.component.css']
})
export class ClientesFrecuentesComponent {
  // Objeto para mantener el estado de los desplegables
  dropdownOpen: { [key: string]: boolean } = {};

  constructor(private router: Router, private loginService:LoginService){}

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
  logout() {
    const logoutRealizado = this.loginService.logout();
    if (!logoutRealizado) { 
      return;
    }
    
    console.log('Cierre de sesión realizado correctamente.');
  }
}
