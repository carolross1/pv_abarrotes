import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CorteCajaComponent } from '../corte-caja/corte-caja.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CorteCajaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule


  ],
  exports: [
  CorteCajaComponent
  ]
})
export class Hu03CorteCajaModule { }
