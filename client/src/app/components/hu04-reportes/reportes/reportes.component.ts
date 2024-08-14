import { Component } from '@angular/core';
import { ReporteService } from '../../../services/reportes/reportes.service';
import { Reportes } from '../../../models/Reportes';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  fechaDesde: string='';
  fechaHasta: string='';
  reportes: Reportes[] = [];
  totalGanancias: number=0; 

  constructor(private reportesService: ReporteService, private loginService:LoginService) {}
  
  dropdownOpen: { [key: string]: boolean } = {}; // Estado de los menús desplegables
  toggleDropdown(key: string): void {
    // Primero, cerrar cualquier otro desplegable que esté abierto
    for (const dropdownKey in this.dropdownOpen) {
      if (dropdownKey !== key) {
        this.dropdownOpen[dropdownKey] = false;
      }
    }
    // Alternar el estado del desplegable actual
    this.dropdownOpen[key] = !this.dropdownOpen[key];
  }


  obtenerReportes(fechaDesde: string, fechaHasta: string): void {
    this.reportesService.obtenerReporte(fechaDesde, fechaHasta).subscribe(
      data => {
        this.reportes = data;
        console.log('Reportes obtenidos:', this.reportes);
        this.calcularTotalGanancias();
      },
      error => {
        console.error('Error obteniendo reportes:', error);
      }
    );
}

calcularTotalGanancias() {
  this.totalGanancias = this.reportes.reduce((sum, reporte) => sum + reporte.ganancias, 0);
}
logout() {
  const logoutRealizado = this.loginService.logout();
  if (!logoutRealizado) { 
    return;
  }
  
  console.log('Cierre de sesión realizado correctamente.');
}
}