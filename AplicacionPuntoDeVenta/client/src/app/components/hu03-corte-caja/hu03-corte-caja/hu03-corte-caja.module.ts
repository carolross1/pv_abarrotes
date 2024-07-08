import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorteCajaComponent } from '../corte-caja/corte-caja.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CorteCajaComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
  CorteCajaComponent
  ]
})
export class Hu03CorteCajaModule { }
