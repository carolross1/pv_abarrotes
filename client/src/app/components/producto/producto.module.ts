import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { ProductoService } from '../../services/productos/producto.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
  ],
  providers: [ProductoService], 
  exports: [
 ProductoComponent
  ]
})
export class ProductoModule { }
