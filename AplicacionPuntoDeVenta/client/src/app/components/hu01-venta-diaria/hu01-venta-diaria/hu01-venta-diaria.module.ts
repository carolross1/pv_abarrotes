import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalVentasComponent } from '../principal-ventas/principal-ventas.component';
import { InventarioComponent } from '../../hu05-inventario/inventario/inventario.component';
import { RouterModule } from '@angular/router';
import { FacturaComponent } from '../factura/factura.component';
import { DescuentoComponent } from '../descuento/descuento.component';


@NgModule({
  declarations: [   
    PrincipalVentasComponent,FacturaComponent,DescuentoComponent],

  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
   PrincipalVentasComponent, FacturaComponent,DescuentoComponent
  ]
})
export class Hu01VentaDiariaModule { }
