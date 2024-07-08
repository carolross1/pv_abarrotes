import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedores';

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

  constructor(
    private proveedoresService: ProveedoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
}
