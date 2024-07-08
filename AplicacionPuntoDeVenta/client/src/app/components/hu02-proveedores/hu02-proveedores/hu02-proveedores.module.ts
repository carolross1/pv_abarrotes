import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelarPedidoComponent } from '../cancelar-pedido/cancelar-pedido.component';
import { EntregasProveedorComponent } from '../entregas-proveedor/entregas-proveedor.component';
import { PedidosAProveedorComponent } from '../pedidos-a-proveedor/pedidos-a-proveedor.component';
import { ProveedorFormComponent } from '../proveedores/proveedores.component';
import { ProveedoresListComponent } from '../proveedores-list/proveedores-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
CancelarPedidoComponent,
PedidosAProveedorComponent,
EntregasProveedorComponent,
ProveedoresListComponent,
ProveedorFormComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    CancelarPedidoComponent,
PedidosAProveedorComponent,
EntregasProveedorComponent,
ProveedoresListComponent,
ProveedorFormComponent
  ]
})
export class Hu02ProveedoresModule { }
