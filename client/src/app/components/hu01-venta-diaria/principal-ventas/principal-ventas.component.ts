import { Component,OnInit} from '@angular/core';
import { ProductoService } from '../../../services/productos/producto.service';

@Component({
  selector: 'app-principal-ventas',
  templateUrl: './principal-ventas.component.html',
  styleUrl: './principal-ventas.component.css'
})
export class PrincipalVentasComponent implements OnInit {
  numeroNotificaciones: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductosBajoStock().subscribe(
      (data) => {
        this.numeroNotificaciones = data.length;
      },
      error => console.error('Error al obtener productos con bajo stock', error)
    );
  }
}