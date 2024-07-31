import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Factura } from '../../../models/Factura';
import { FacturaService } from '../../../services/factura/factura.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
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

  constructor(private facturaService: FacturaService) {}

  onSubmit() {
    this.facturaService.createFactura(this.factura).subscribe(response => {
      console.log('Factura creada:', response);
      this.generarPDF(); // Generar el PDF después de crear la factura
    }, error => {
      console.error('Error al crear factura:', error);
    });
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
      head: [['Detalle', 'Valor']],
      body: [
        ['Subtotal', this.factura.total.toString()],
        // Agrega más filas según sea necesario
      ]
    }); 

    doc.save('factura.pdf');
  }
}