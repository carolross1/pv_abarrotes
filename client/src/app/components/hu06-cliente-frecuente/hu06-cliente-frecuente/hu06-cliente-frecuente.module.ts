import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesFrecuentesComponent } from '../clientes-frecuentes/clientes-frecuentes.component';
import { ListaClientesFrecuentesComponent } from '../lista-clientes-frecuentes/lista-clientes-frecuentes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ClientesFrecuentesComponent, ListaClientesFrecuentesComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
, exports:[ClientesFrecuentesComponent,ListaClientesFrecuentesComponent

]
})
export class Hu06ClienteFrecuenteModule { }
