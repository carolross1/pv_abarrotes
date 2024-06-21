
import { Component,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-corte-caja',
  templateUrl: './corte-caja.component.html',
  styleUrls: ['./corte-caja.component.css'], 
  encapsulation: ViewEncapsulation.Emulated
})
export class CorteCajaComponent {
  employeeId: string = '';
  firstTicket: string = '';
  lastTicket: string = '';
  date: string = '';
  showReport: boolean = false;

  corteDeCaja() {
    // Aquí puedes agregar la lógica para manejar el corte de caja.
    // Por ejemplo, podrías enviar los datos a un servicio para guardarlos en una base de datos.
    console.log('ID del Empleado:', this.employeeId);
    console.log('Clave del Primer Ticket:', this.firstTicket);
    console.log('Clave del Último Ticket:', this.lastTicket);
    console.log('Fecha:', this.date);

   // Muestra el reporte de ventas
   this.showReport = true;
  }

  closeReport() {
    // Oculta el reporte de ventas
    this.showReport = false;
  }
}