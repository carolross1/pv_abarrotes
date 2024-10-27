import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorteCajaComponent } from './components/hu03-corte-caja/corte-caja/corte-caja.component';
import { InventarioComponent } from './components/hu05-inventario/inventario/inventario.component';
import { NotificacionesComponent } from './components/hu07-notificacion/notificaciones/notificaciones.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrincipalVentasComponent } from './components/hu01-venta-diaria/principal-ventas/principal-ventas.component';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { InventariosFrecuentesComponent } from './components/hu05-inventario/inventarios-frecuentes/inventarios-frecuentes.component';
import { EntregasProveedorComponent } from './components/hu02-proveedores/entregas-proveedor/entregas-proveedor.component';
import { LoginComponent } from './components/login/login.component';
import { PedidosProveedorComponent } from './components/hu02-proveedores/pedidos-a-proveedor/pedidos-a-proveedor.component';
import { CancelarPedidoComponent } from './components/hu02-proveedores/cancelar-pedido/cancelar-pedido.component';
import { ReportesComponent } from './components/hu04-reportes/reportes/reportes.component';
import { ListaProveedoresComponent } from './components/hu02-proveedores/proveedores-list/proveedores-list.component';
import { FacturaComponent } from './components/hu01-venta-diaria/factura/factura.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { ProductoComponent } from './components/producto/producto/producto.component';
import { ListaCategoriasComponent } from './components/producto/lista-categorias/lista-categorias.component';
import { ListaUsuariosComponent } from './components/nuevo-usuario/lista-usuarios/lista-usuarios.component';
import { FacturaListComponent } from './components/hu01-venta-diaria/factura-list/factura-list.component';
import { FacturaDetailComponent } from './components/hu01-venta-diaria/factura-detail/factura-detail.component';
import { VentaListComponent } from './components/hu01-venta-diaria/venta-list/venta-list.component';
import { DetalleVentaComponent } from './components/hu01-venta-diaria/detalle-venta/detalle-venta.component';
import { DireccionPagoComponent } from './components/hu01-venta-diaria/direccion-pago/direccion-pago.component';
import { RedesSocialesComponent } from './redes-sociales/redes-sociales.component';
import { CocktailsComponent } from './components/cocktails/cocktails.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { WeatherComponent } from './components/weather/weather.component';
import { authGuard } from './services/autenticacion/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'principal',
    component:PrincipalVentasComponent,
    canActivate: [authGuard],
    data: { tipo_Usuario: 'Empleado' } 
  },
  {
path: 'cocktail',
component: CocktailsComponent

  },
  {
     path: 'spotify', component: SpotifyComponent 
  },
  {
    path: 'callback', component: SpotifyComponent
 },

  {
    path:'ventas',
    component:VentaListComponent
  },
  {
    path:'detalles/:id_Venta',
    component:DetalleVentaComponent
  },
  {
    path:'menu', 
    component:MenuComponent
  },
  { path: 'inventariofrecuente/:id', 
    component: InventariosFrecuentesComponent, 
    canActivate: [authGuard],
    data: { tipo_Usuario: 'Admin' } 
  },
  { path: 'inventarios', 
    component: InventarioComponent, 
    canActivate: [authGuard],
    data: { tipo_Usuario: 'Admin' } 
  },
  {
    path:'notificacion', 
    component:NotificacionesComponent
  },
  {
    path:'redes-sociales', 
    component:RedesSocialesComponent
  },
  {
    path:'cortedecaja',
    component:CorteCajaComponent,
    canActivate: [authGuard],
    data: { tipo_Usuario: 'Empleado' } 
    
  },
  {
    path:'entregasproveedor', 
    component:EntregasProveedorComponent
  },
  {
    path:'login', 
    component:LoginComponent
  },
  {
    path:'pedidosaproveedor', 
    component:PedidosProveedorComponent
  },
  {
    path:'weather',
    component:WeatherComponent

  },
 
  {
    path:'proveedores', 
    component:ListaProveedoresComponent
  },
  {
    path:'proveedores/edit/:id_Proveedor', 
    component:ListaProveedoresComponent
  },
  {
    path:'cancelarpedido', 
    component:CancelarPedidoComponent
  }, 
  {
    path:'reportes', 
    component:ReportesComponent,
    canActivate: [authGuard],
    data: { tipo_Usuario: 'Admin' } 
  },
  {
    path:'crear-factura', 
    component:FacturaComponent
  },
  {
    path:'editar-factura/:id', 
    component:FacturaComponent
  },
  {
    path:'facturas', 
    component:FacturaListComponent
  },
  {
    path:'factura/:id', 
    component:FacturaDetailComponent
  },

  {
    path:'usuario',
    component:NuevoUsuarioComponent,
    canActivate: [authGuard],
    data: { tipo_Usuario: 'Admin' } 
  },
  {
    path:'listausuario',
    component:ListaUsuariosComponent,
    canActivate: [authGuard],
    data: { tipo_Usuario: 'Admin' } 
  },
  {
    path:'usuario/editar/:id',
    component:NuevoUsuarioComponent,
    canActivate: [authGuard],
    data: { tipo_Usuario: 'Admin' } 
  },
  {
    path:'productos',
    component:ProductoComponent
  },
  {
    path:'categoria',
    component:ListaCategoriasComponent
  },
  {
    path: 'ubicacion', component: DireccionPagoComponent 
  },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
