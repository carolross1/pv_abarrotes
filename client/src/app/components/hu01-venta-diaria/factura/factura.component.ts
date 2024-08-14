import { Component,OnInit} from '@angular/core';
import { Factura } from '../../../models/Factura';
import { FacturaService } from '../../../services/factura/factura.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']  // Corregido: styleUrls en lugar de styleUrl
})
export class FacturaComponent implements OnInit {
  factura: Factura = {
    id_Venta: '',
    RFC: '',
    nombre: '',
    apellidos: '',
    estado: '',
    municipio: '',
    codigo_Postal: '',
    direccion: '',
    fecha_Factura: '',
    total: 0
  };
detallesVenta:any[]=[];

  dropdownOpen: { [key: string]: boolean } = {}; // Estado de los desplegables

  constructor(private facturaService: FacturaService, private loginService:LoginService) {}
  ngOnInit(): void {
    
  }

  onSubmit() {
    this.facturaService.createFactura(this.factura).subscribe(response => {
      console.log('Factura creada:', response);
      this.facturaService.getDetallesVenta(this.factura.id_Venta).subscribe(detalles=>{
        this.detallesVenta=detalles;
        const totalVenta = this.detallesVenta.reduce((acc, detalle) => acc + detalle.total_venta, 0);
        this.factura.total = totalVenta;
      this.generarPDF(); // Generar el PDF después de crear la factura
    }, error => {
      console.error('Error al crear el detalle:', error);
    });
  },error =>{

  console.error('error al crear la factura',error);
  
  });
}
  
actualizarTotal() {
  if (this.factura.id_Venta) {
    this.facturaService.getTotalPorTicket(this.factura.id_Venta).subscribe(response => {
      this.factura.total = response.total;
    }, error => {
      console.error('Error al obtener el total por número de ticket:', error);
    });
  } else {
    this.factura.total = 0; // Resetea el total si no hay número de ticket
  }
}

  generarPDF() {
    const doc = new jsPDF();
    doc.text('Factura', 10, 10);
    doc.text(`Número de Ticket: ${this.factura.id_Venta}`, 10, 20);
    doc.text(`RFC: ${this.factura.RFC}`, 10, 30);
    doc.text(`Nombre: ${this.factura.nombre}`, 10, 40);
    doc.text(`Apellidos: ${this.factura.apellidos}`, 10, 50);
    doc.text(`Estado: ${this.factura.estado}`, 10, 60);
    doc.text(`Municipio: ${this.factura.municipio}`, 10, 70);
    doc.text(`Código Postal: ${this.factura.codigo_Postal}`, 10, 80);
    doc.text(`Dirección: ${this.factura.direccion}`, 10, 90);
    doc.text(`Fecha de Factura: ${this.factura.fecha_Factura}`, 10, 100);
    doc.text(`Total: ${this.factura.total}`, 10, 110);

    // Agregar tabla de detalles si es necesario
    autoTable(doc, {
      startY: 120,
      head: [['ID Producto', 'Cantidad', 'Descuento', 'Total Venta']],
      body: this.detallesVenta.map(detalle => [
        detalle.id_Producto,
        detalle.cantidad,
        detalle.descuento,
        detalle.total_venta
      ])
    });

    doc.save('factura.pdf');
  }

  // Método para alternar el estado de los desplegables
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
  logout() {
    const logoutRealizado = this.loginService.logout();
    if (!logoutRealizado) {
      return;
    }
    
    console.log('Cierre de sesión realizado correctamente.');
  }
}
