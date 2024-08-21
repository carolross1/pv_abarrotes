import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { Hu01VentaDiariaModule } from './components/hu01-venta-diaria/hu01-venta-diaria/hu01-venta-diaria.module';
import { Hu02ProveedoresModule } from './components/hu02-proveedores/hu02-proveedores/hu02-proveedores.module';
import { Hu03CorteCajaModule } from './components/hu03-corte-caja/hu03-corte-caja/hu03-corte-caja.module';
import { Hu04ReportesModule } from './components/hu04-reportes/hu04-reportes/hu04-reportes.module';
import { Hu05InventarioModule } from './components/hu05-inventario/hu05-inventario/hu05-inventario.module';
import { Hu06ClienteFrecuenteModule } from './components/hu06-cliente-frecuente/hu06-cliente-frecuente/hu06-cliente-frecuente.module';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { Hu07NotificacionModule } from './components/hu07-notificacion/hu07-notificacion/hu07-notificacion.module';
import { ProveedoresService } from './services/Proveedores/proveedores-list.service';
import { ProductoServiceModule} from './services/productos/productos.module';
import { ProductoModule } from './components/producto/producto.module';
import { ProductoService } from './services/productos/producto.service';
import { VentaService } from './services/principal-ventas/venta.service';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { ListaUsuariosComponent } from './components/nuevo-usuario/lista-usuarios/lista-usuarios.component';
import { AlertaService } from './services/alertas/alerta.service';
import { EntregaService } from './services/entregas/entrega-proveedor.service';

                                                                                                                                                                                                                                                                                                                        

@NgModule({
  declarations: [
    AppComponent,
   MenuComponent,
   LoginComponent,

   NuevoUsuarioComponent,
   ListaUsuariosComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Hu01VentaDiariaModule,
    Hu02ProveedoresModule,
    Hu03CorteCajaModule,
    Hu04ReportesModule,
    Hu05InventarioModule,
    Hu06ClienteFrecuenteModule,
    Hu07NotificacionModule,
    ProductoServiceModule, 
    ProductoModule,

  ],
  providers: [ProveedoresService,ProductoServiceModule,ProductoService,VentaService,AlertaService,EntregaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
