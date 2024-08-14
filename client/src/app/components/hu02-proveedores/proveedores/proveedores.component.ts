import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedores';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedorFormComponent implements OnInit {
  proveedor: Proveedor = {
    nombre: '',
    apellidos: '',
    telefono: '',
    empresa: ''
  };

  // Estado para los desplegables (si fuera necesario en este componente)
  dropdownOpen: { [key: string]: boolean } = {};

  constructor(
    private proveedoresService: ProveedoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService:LoginService
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.proveedoresService.getProveedor(params['id']).subscribe(
        data => {
          this.proveedor = data;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  saveProveedor(): void {
    if (this.proveedor.id_Proveedor) {
      this.proveedoresService.updateProveedor(this.proveedor.id_Proveedor.toString(), this.proveedor).subscribe(
        () => {
          this.router.navigate(['/proveedores']);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.proveedoresService.saveProveedor(this.proveedor).subscribe(
        () => {
          this.router.navigate(['/proveedores']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

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
  logout() {
    const logoutRealizado = this.loginService.logout();
    if (!logoutRealizado) { 
      return;
    }
    
    console.log('Cierre de sesión realizado correctamente.');
  }
}
