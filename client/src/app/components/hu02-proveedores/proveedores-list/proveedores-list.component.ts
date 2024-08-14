import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedores';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.css']
})
export class ProveedoresListComponent implements OnInit {
  dropdownOpen: { [key: string]: boolean } = {}; // Inicializa un objeto para manejar el estado de los desplegables

  proveedores: Proveedor[] = [];

  constructor(private proveedoresService: ProveedoresService,private loginService:LoginService) {}

  ngOnInit(): void {
    this.proveedoresService.getProveedores().subscribe(
      data => {
        this.proveedores = data;
      },
      error => {
        console.error(error);
      }
    );
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

  deleteProveedor(id_Proveedor?: number): void {
    if (id_Proveedor !== undefined) {
      this.proveedoresService.deleteProveedor(id_Proveedor.toString()).subscribe(
        () => {
          this.proveedores = this.proveedores.filter(proveedor => proveedor.id_Proveedor !== id_Proveedor);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Error: id_Proveedor es indefinido');
    }
  }
  logout() {
    const logoutRealizado = this.loginService.logout();
    if (!logoutRealizado) { 
      return;
    }
    
    console.log('Cierre de sesión realizado correctamente.');
  }
}
