import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/productos/producto.service';
import { Producto } from '../../../models/Producto';  
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Categoria } from '../../../models/Categoria';
import { LoginService } from '../../../services/login/login.service';
import { AlertaService } from '../../../services/alertas/alerta.service';
import { Router } from '@angular/router';

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
  errorMessage=""
  inputError = false;

  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Verifica si el valor ingresado es un número válido
    if (isNaN(Number(value)) || Number(value) < 1) {
      this.inputError = true;
      // Elimina el valor no válido
      input.value = '';
    } else {
      this.inputError = false;
    }
  }


  // Agrega una propiedad para manejar el estado de los menús desplegables
  dropdownOpen: { [key: string]: boolean } = {};

  constructor(private productoService: ProductoService, 
    private categoriaService: CategoriaService,
  private loginService:LoginService,
private alertaService:AlertaService,
private router:Router) { }

  ngOnInit() {
    this.cargarProductos();
    this.getCategorias();
  }
  
  cargarProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
      this.filteredProductos = data; 
    });
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias);
  }

  guardarProducto(form: NgForm) {
    if (form.valid) {
      if (this.editando) {
        this.productoService.updateProducto(this.producto).subscribe(
          response => {
            console.log('Producto actualizado:', response);
            this.handlePostSubmitActions();
          },
          error => {
            if (error.status === 400 && error.error.message.includes('Nombre del producto ya existe')) {
              this.errorMessage = 'Ya existe un producto con este nombre. Por favor, utiliza un nombre diferente.';
            } else if (error.status === 400 && error.error.message.includes('Código de barras ya está en uso')) {
              this.errorMessage = 'El código de barras ya está en uso. Por favor, utiliza un código diferente.';
            } else {
              this.errorMessage = 'Error al actualizar el producto: ' + (error.error?.message || 'Ha ocurrido un error inesperado.');
            }
            console.error('Error al actualizar el producto:', error);
          }
        );
      } else {
        this.productoService.createProducto(this.producto).subscribe(
          response => {
            console.log('Producto creado:', response);
            this.handlePostSubmitActions();
          },
          error => {
            if (error.status === 400 && error.error.message.includes('Nombre del producto ya existe')) {
              this.errorMessage = 'Ya existe un producto con este nombre. Por favor, utiliza un nombre diferente.';
            } else if (error.status === 400 && error.error.message.includes('Código de barras ya está en uso')) {
              this.errorMessage = 'El código de barras ya está en uso. Por favor, utiliza un código diferente.';
            } else {
              this.errorMessage =  (error.error?.message || 'Ha ocurrido un error inesperado.');
            }
            console.error('Error al crear el producto:', error);
          }
        );
      }
    } else {
      console.log('Formulario inválido');
      this.errorMessage = 'El formulario no es válido. Por favor, revisa los datos ingresados.';
    }
  }
  
  handlePostSubmitActions() {
    // Si es necesario, puedes cargar los productos actualizados
    this.productoService.getProductos().subscribe(
      productos => {
        this.productos = productos;
        // Puedes realizar otras acciones necesarias después de la creación o actualización del producto
        this.alertaService.showNotification('Producto guardado exitosamente', 'success');
        this.router.navigate(['/productos']);
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
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
