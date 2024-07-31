
import { Component,ViewEncapsulation} from '@angular/core';
import { CorteCajaService } from '../../../services/corte-caja/corte-caja.service';
import { CorteDeCajaReporte } from '../../../models/CorteCaja';

@Component({
  selector: 'app-corte-caja',
  templateUrl: './corte-caja.component.html',
  styleUrls: ['./corte-caja.component.css'], 
  encapsulation: ViewEncapsulation.Emulated
})
export class CorteCajaComponent {
  id_Usuario: string = '';
  fecha: string = ''; // Asegúrate de que esta fecha esté en formato 'YYYY-MM-DD'
  reportData: CorteDeCajaReporte = {
    fecha: '',
    total_Ventas: 0,
    monto_Entregar: 0
  };
  showReport: boolean = false;

  constructor(private corteCajaService: CorteCajaService) {}

  corteDeCaja() {
    // Asegúrate de que `fecha` esté en formato 'YYYY-MM-DD'
    this.corteCajaService.getCorteDeCaja(this.id_Usuario, this.fecha)
      .subscribe(data => {
        this.reportData = data;
        this.showReport = true;
      }, error => {
        console.error('Error al obtener el corte de caja', error);
      });
  }

  closeReport() {
    this.showReport = false;
  }
}
 