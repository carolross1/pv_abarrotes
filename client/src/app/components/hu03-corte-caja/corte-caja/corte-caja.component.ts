
import { Component,ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-corte-caja',
  templateUrl: './corte-caja.component.html',
  styleUrls: ['./corte-caja.component.css'], 
  encapsulation: ViewEncapsulation.Emulated
})
export class CorteCajaComponent {
  id_Corte_Caja: number = 1;
  id_Usuario: string = '';
  id_Venta_Primero: string = '';
  id_Venta_Ultimo: string = '';
  fecha_Inicio: string = '';
  fecha_Termino: string = '';
  total_Ventas: number = 0;
  monto_Entregar: number = 0;
  fecha_Corte: string = '';
  showReport: boolean = false;
  reportData: any;

  constructor(private http: HttpClient) {}

  corteDeCaja() {
    const corteData = {
      id_Usuario: this.id_Usuario,
      id_Venta_Primero: this.id_Venta_Primero,
      id_Venta_Ultimo: this.id_Venta_Ultimo,
      fecha_Inicio: this.fecha_Inicio
    };

    this.http.post('http://localhost:3000/api/cortecaja', corteData).subscribe((response: any) => {
      this.showReport = true;
      this.reportData = response;
    });
  }

  closeReport() {
    this.showReport = false;
  }
}







 