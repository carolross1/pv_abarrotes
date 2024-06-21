import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CorteCajaComponent } from './components/corte-caja/corte-caja.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { PrincipalVentasComponent } from './components/principal-ventas/principal-ventas.component';
import { InventariosFrecuentesComponent } from './components/inventarios-frecuentes/inventarios-frecuentes.component';
import { EditarProveedorComponent } from './components/editar-proveedor/editar-proveedor.component';
import { EliminarProveedorComponent } from './components/eliminar-proveedor/eliminar-proveedor.component';
import { EntregasProveedorComponent } from './components/entregas-proveedor/entregas-proveedor.component';
import { PedidosAProveedorComponent } from './components/pedidos-a-proveedor/pedidos-a-proveedor.component';
import { LoginComponent } from './components/login/login.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { CancelarPedidoComponent } from './components/cancelar-pedido/cancelar-pedido.component';
import { ReportesComponent } from './components/reportes/reportes.component';


@NgModule({
  declarations: [
    AppComponent,
    CorteCajaComponent,
    NotificacionesComponent,
    InventarioComponent,
    MenuComponent,
    PrincipalVentasComponent,
    InventariosFrecuentesComponent,
    EditarProveedorComponent,
    EliminarProveedorComponent,
    EntregasProveedorComponent,
    PedidosAProveedorComponent,
    LoginComponent,
    ProveedoresComponent,
    CancelarPedidoComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,// Agrega FormsModule aquí

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
