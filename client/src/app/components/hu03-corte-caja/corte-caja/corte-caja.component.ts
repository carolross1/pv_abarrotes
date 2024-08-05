import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CorteCajaService } from '../../../services/corte-caja/corte-caja.service';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corte-caja',
  templateUrl: './corte-caja.component.html',
  styleUrl:'./corte-caja.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class CorteCajaComponent implements OnInit {
  id_Usuario: string = '';
  montoInicial: number = 0;
  montoFinal: number = 0;
  montoEnCaja: any={};
  fecha: string = '';
  esCorteInicial: boolean = true;
  esCorteParcial: boolean = false;
  esCorteFinal: boolean = false;
  showReport: boolean = false;
  showCorteDetails: boolean = false; // Variable para mostrar los detalles del corte
  reportData: any;

  constructor(private corteCajaService: CorteCajaService, private router:Router, private LoginService:LoginService) {}

  ngOnInit() {
    this.verificarEstadoCorte();
  }

  verificarEstadoCorte() {
    const estadoCorte = localStorage.getItem('estadoCorte');
    if (estadoCorte) {
      this.esCorteInicial = estadoCorte === 'inicial';
      this.esCorteParcial = estadoCorte === 'parcial';
      this.esCorteFinal = estadoCorte === 'final';
    } else {
      this.esCorteInicial = true;
      this.esCorteParcial = false;
      this.esCorteFinal = false;
    }
  }

  corteDeCaja() {
    if (this.esCorteInicial) {
      this.realizarCorteInicial();
    } else if (this.esCorteParcial) {
      this.realizarCorteParcial();
    } else if (this.esCorteFinal) {
      this.registrarCorteFinal();
    }
  }

    realizarCorteInicial() {
      const data = {
        id_Usuario: this.id_Usuario,
        monto_Inicial: this.montoInicial,
        fecha: this.fecha
      };
  
      this.corteCajaService.registrarMontoInicial(data).subscribe(
        response => {
          if (response.success) {
            console.log('Corte inicial realizado con éxito.');
            localStorage.setItem('estadoCorte', 'parcial');
            this.esCorteInicial = false;
            this.esCorteParcial = true;
           // this.obtenerMontoEnCaja();
            alert('Corte inicial realizado con éxito.');
          } else {
            alert('Error al realizar el corte inicial.');
          }
        },
        error => {
          console.error('Error al realizar el corte inicial:', error);
          alert('Error al realizar el corte inicial.');
        }
      );
    }
    realizarCorteParcial() {
      const data = {
        id_Usuario: this.id_Usuario,
        monto_Inicial: this.montoInicial,
        monto_Final: this.montoFinal,
        fecha: this.fecha
      };
  
      this.corteCajaService.registrarCorteParcial(data).subscribe(
        response => {
          if (response.success) {
           // this.montoEnCaja=response.montoCaja;
            console.log('Corte parcial realizado con éxito.'/*this.montoEnCaja*/);
            this.obtenerMontoEnCaja();
            this.showCorteDetails = true; // Mostrar los detalles del corte
            alert('Corte parcial realizado con éxito.');
          } else {
            alert('Error al realizar el corte parcial.');
          }
        },
        error => {
          console.error('Error al realizar el corte parcial:', error);
          alert('Error al realizar el corte parcial.');
        }
      );
    }
  
    registrarCorteFinal() {
      const data = {
        id_Usuario: this.id_Usuario,
        monto_Final: this.montoFinal,
        fecha: this.fecha
      };
  
      this.corteCajaService.registrarCorteFinal(data).subscribe(
        response => {
          if (response.success) {
            console.log('Corte final realizado con éxito.');
            localStorage.removeItem('estadoCorte'); // Elimina el estado para que no se pida un nuevo corte final innecesariamente
            this.esCorteInicial = false;
            this.esCorteParcial = false;
            this.esCorteFinal = true;
            this.obtenerMontoEnCaja();
            this.showCorteDetails = true; // Mostrar los detalles del corte
            alert('Corte final realizado con éxitoddd.');
          } else {
            alert('Error al realizar el corte final.');
          }
        },
        error => {
          console.error('Error al realizar el corte final:', error);
          alert('Error al realizar el corte final.');
        }
      );
    }
    obtenerMontoEnCaja() {
      // Suponiendo que `id_Usuario` y `fecha` ya están definidos en el componente
      const data = { id_Usuario: this.id_Usuario, fecha: this.fecha };
      this.corteCajaService.registrarCorteFinal(data).subscribe(
        response => {
          if (response.success) {
            this.montoEnCaja = response.montoCaja;
            console.log('Monto en caja obtenido:', this.montoEnCaja);
          } else {
            console.error('Error al obtener el monto en caja:', response.message);
          }
        },
        error => {
          console.error('Error al obtener el monto en caja:', error);
        }
      );
    }
    closeReport() {
      this.showCorteDetails = false; // Ocultar el reporte de ventas
      if (this.esCorteFinal) {
        // Eliminar datos de sesión o token de autenticación
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        // O cualquier otro dato de sesión que estés utilizando
        // Redirigir al inicio de sesión
        this.router.navigate(['/login']);
      }
    }
  }