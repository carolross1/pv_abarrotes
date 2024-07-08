import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotificacionesComponent],
  imports: [
    CommonModule,
    RouterModule
  ], 
  exports:[NotificacionesComponent]
})
export class Hu07NotificacionModule { }
