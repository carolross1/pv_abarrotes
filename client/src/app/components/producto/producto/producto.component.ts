import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/productos/producto.service';
import { Producto } from '../../../models/Producto';  
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Categoria } from '../../../models/Categoria';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-producto',
  templateUrl:'./producto.component.html',
  styleUrls: ['./producto.component.css'] // Corregido de styleUrl a styleUrls
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  filteredProductos: Producto[] = []; 
  searchTerm: string = '';
  producto: Producto = {
    id_Producto: 0,
    nombre: '',
    id_Categoria: 0,
    precio_Compra: 0,
    precio_Venta: 0,
    utilidad: 0,
    cantidad_Stock: 0,
    cant_Minima: 0,
    codigo_Barras: 0
  };
  categorias: Categoria[] = [];
  editando: boolean = false;
  mostrarProductos: boolean = false;

  
  // Agrega una propiedad para manejar el estado de los menús desplegables
  dropdownOpen: { [key: string]: boolean } = {};

  constructor(private productoService: ProductoService, 
    private categoriaService: CategoriaService,
  private loginService:LoginService) { }

  ngOnInit() {
    this.cargarProductos();
    this.getCategorias();
  }
  
  cargarProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
      this.filteredProductos = data; // INICIALIZAR LA LISTA FILTRADA
    });
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias);
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
      codigo_Barras: 0
    };
  }

  // Método para alternar el estado de los menús desplegables
  toggleDropdown(menu: string): void {
    // Cierra todos los menús desplegables
    Object.keys(this.dropdownOpen).forEach(key => {
      if (key !== menu) {
        this.dropdownOpen[key] = false;
      }
    });
    // Alterna el menú desplegable actual
    this.dropdownOpen[menu] = !this.dropdownOpen[menu];
  }
  searchProductos(): void {
    if (this.searchTerm.trim()) {
      this.filteredProductos = this.productos.filter(p => p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.filteredProductos = this.productos; // RESTABLECER LA LISTA SI NO HAY TÉRMINO DE BÚSQUEDA
    }
  }
  logout() {
    this.loginService.logout();
  }
}
