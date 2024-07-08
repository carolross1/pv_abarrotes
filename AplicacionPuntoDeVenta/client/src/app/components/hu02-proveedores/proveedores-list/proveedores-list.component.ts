import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedores';

@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.css']
})
export class ProveedoresListComponent implements OnInit {
  proveedores: Proveedor[] = [];

  constructor(private proveedoresService: ProveedoresService) {}

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
}
