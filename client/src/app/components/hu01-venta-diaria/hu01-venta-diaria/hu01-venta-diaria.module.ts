import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importa CUSTOM_ELEMENTS_SCHEMA
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrincipalVentasComponent } from '../principal-ventas/principal-ventas.component';
import { RouterModule } from '@angular/router';
import { FacturaComponent } from '../factura/factura.component';
import { Hu07NotificacionModule } from '../../hu07-notificacion/hu07-notificacion/hu07-notificacion.module';
import { PaypalPaymentComponent } from '../../../paypal-payment/paypal-payment.component';

@NgModule({
  declarations: [
    PrincipalVentasComponent,
    FacturaComponent,
    PaypalPaymentComponent // Asegúrate de que esté declarado aquí
  ],
  imports: [
    CommonModule,
    RouterModule,
    Hu07NotificacionModule,
    FormsModule,
  ],
  exports: [
    PrincipalVentasComponent,
    FacturaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añade CUSTOM_ELEMENTS_SCHEMA aquí
})
export class Hu01VentaDiariaModule { }
