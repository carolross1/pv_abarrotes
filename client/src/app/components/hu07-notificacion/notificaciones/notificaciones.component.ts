import { Component } from '@angular/core';
import { OnInit,EventEmitter,Output } from '@angular/core';
import { ProductoService } from '../../../services/productos/producto.service';
import { Producto } from '../../../models/Producto';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl:'./notificaciones.component.css'
})


export class NotificacionesComponent implements OnInit {

  productos: Producto[] = [];
  atendidoState: { [key: number]: boolean } = {}; // Estado de atendido por ID de producto

  @Output() notificacionesNoAtendidas = new EventEmitter<number>();

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductosBajoStock();
  }

  getProductosBajoStock(): void {
    this.productoService.getProductosBajoStock().subscribe(
      (data: Producto[]) => {
        console.log('Productos con bajo stock:', data); // Verifica los datos aquí
        this.productos = data;
       this.notificacionesNoAtendidas.emit(this.productos.length);
    },
      error => console.error('Error al obtener productos con bajo stock', error)
    );
  }
  realizarPedido(id_Producto: number): void {
    this.atendidoState[id_Producto] = true; // Marcar como atendido
  }
}