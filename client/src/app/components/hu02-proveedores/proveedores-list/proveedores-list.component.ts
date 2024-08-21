import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/Proveedores/proveedores-list.service';
import { Proveedor } from '../../../models/Proveedores-list';
import { LoginService } from '../../../services/login/login.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.css']
})
export class ListaProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  nombreProveedor: string = '';
  apellidoProveedor: string = '';
  correoProveedor: string | null = null;
  empresaProveedor: string = '';
  searchTerm: string = '';
  dropdownOpen: { [key: string]: boolean } = {};


  constructor(private proveedorService: ProveedoresService,private loginService:LoginService) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
  }
  addProveedor(): void {
    if (this.nombreProveedor.trim() && this.apellidoProveedor.trim() && this.correoProveedor !== null && this.empresaProveedor.trim()) {
      const newProveedor: Omit<Proveedor, 'id_Proveedor'> = {
        nombre: this.nombreProveedor,
        apellidos: this.apellidoProveedor,
        correo: this.correoProveedor,
        empresa: this.empresaProveedor,
        editing: false // Asignar false como valor por defecto
      };
      this.proveedorService.addProveedor(newProveedor).subscribe(
        () => {
          this.getProveedores(); // Volver a obtener la lista actualizada
          this.resetForm(); // Limpiar los campos de entrada
        },
        error => {
          console.error('Error al agregar al proveedor', error);
        }
      );
    } else {
      console.error('Todos los campos son obligatorios.');
    }
  }

  resetForm(): void {
    this.nombreProveedor = '';
    this.apellidoProveedor = '';
    this.correoProveedor = null;
    this.empresaProveedor = '';
  }

  searchProveedores(): void {
    if (this.searchTerm.trim()) {
      this.proveedores = this.proveedores.filter(c => c.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.getProveedores(); // Restablecer la lista si no hay término de búsqueda
    }
  }


  deleteProveedor(idProveedor: number): void { // Cambia el tipo a `number`
    this.proveedorService.deleteProveedor(idProveedor).subscribe(() => {
      this.getProveedores(); // Volver a obtener la lista actualizada
    });
  }

  editProveedor(proveedor: Proveedor): void {
    proveedor.editing = true;
  }

  saveProveedor(proveedor: Proveedor): void {
    proveedor.editing = false;
    this.proveedorService.updateProveedor(proveedor.id_Proveedor, proveedor).subscribe(() => {
      this.getProveedores(); // Volver a obtener la lista actualizada
    });
  }

  toggleDropdown(menu: string): void {
    // Cerrar cualquier otro desplegable abierto
    for (let key in this.dropdownOpen) {
      if (key !== menu) {
        this.dropdownOpen[key] = false;
      }
    }
    // Alternar el estado del desplegable actual
    this.dropdownOpen[menu] = !this.dropdownOpen[menu];


}
 logout() {
    const logoutRealizado = this.loginService.logout();
    if (!logoutRealizado) { 
      return;
    }
    
    console.log('Cierre de sesión realizado correctamente.');
  }
}