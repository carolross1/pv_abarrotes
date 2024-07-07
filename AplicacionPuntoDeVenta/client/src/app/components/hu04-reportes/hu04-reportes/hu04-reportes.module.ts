import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from '../reportes/reportes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
   exports: [
    ReportesComponent
  ]
})
export class Hu04ReportesModule { }
