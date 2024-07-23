import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/productos/producto.service';
import { Producto } from '../../../models/Producto';  

@Component({
  selector: 'app-producto',
  templateUrl:'./producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {


  productos: Producto[] = [];
  producto: Producto = {
    id_Producto: 0,
    nombre: '',
    id_Categoria: 0,
    precio_Compra: 0,
    precio_Venta: 0,
    utilidad: 0,
    cantidad_Stock: 0,
    cant_Minima: 0,
    codigo_Barras:0
  };
  editando: boolean = false;
  mostrarProductos: boolean = false;
  
  constructor(private productoService: ProductoService) { }

  ngOnInit() {

    this.cargarProductos();
  }
  
  cargarProductos() {
    this.productoService.getProductos().subscribe(data => this.productos = data);
  }
  guardarProducto() {
    
      if (this.editando) {
        this.productoService.updateProducto(this.producto).subscribe(() => {
          this.cargarProductos();
          this.cancelarEdicion();
        });
      } else {
        this.productoService.createProducto(this.producto).subscribe(() => {
          this.cargarProductos();
          this.cancelarEdicion();
        });
      }
    } 

  editarProducto(producto: Producto) {
    this.producto = { ...producto };
    this.editando = true;
  }

  borrarProducto(id: number) {
    this.productoService.deleteProducto(id).subscribe(() => this.cargarProductos());
  }

  cancelarEdicion() {
    this.editando = false;
    this.producto = {
      id_Producto: 0,
      nombre: '',
      id_Categoria: 0,
      precio_Compra: 0,
      precio_Venta: 0,
      utilidad: 0,
      cantidad_Stock: 0,
      cant_Minima: 0,
      codigo_Barras:0
    };
  }
}