import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalVentasComponent } from '../principal-ventas/principal-ventas.component';
import { RouterModule } from '@angular/router';
import { FacturaComponent } from '../factura/factura.component';
import { DescuentoComponent } from '../descuento/descuento.component';
import { Hu07NotificacionModule } from '../../hu07-notificacion/hu07-notificacion/hu07-notificacion.module';



@NgModule({
  declarations: [   
    PrincipalVentasComponent,FacturaComponent,DescuentoComponent],

  imports: [
    CommonModule,
    RouterModule,
    Hu07NotificacionModule,

    
  ],
  exports: [
   PrincipalVentasComponent, FacturaComponent,DescuentoComponent
  ]
})
export class Hu01VentaDiariaModule { }
