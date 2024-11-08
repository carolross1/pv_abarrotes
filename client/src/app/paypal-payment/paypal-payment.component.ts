import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import jsPDF from 'jspdf'; // Importamos jsPDF para generar el PDF
import autoTable from 'jspdf-autotable'; // Importamos autoTable para generar tablas en el PDF

declare var paypal: any; // Declaramos la variable paypal

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.css']
})
export class PaypalPaymentComponent implements OnInit {
  private paypalLoaded: boolean = false;
  public total: number = 48;
  public currency: string = 'MXN';

  constructor() { }

  ngOnInit(): void {
    this.loadPayPalScript();
  }

  loadPayPalScript(): void {
    if (this.paypalLoaded) {
      this.initPayPalButton();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${this.getClientId()}&currency=${this.currency}`;
    script.onload = () => {
      this.paypalLoaded = true;
      this.initPayPalButton();
    };
    script.onerror = () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar el script de PayPal.',
      });
    };
    document.body.appendChild(script);
  }

  getClientId(): string {
    return 'AQd7lGVQaJk523HiKsaOP4O8RL8LppPMEIj0dWfyu6Vzq0YUeGxVbGDLe5f7cxoseDCp5T25F4pRlcww';
  }

  initPayPalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: this.currency,
              value: this.total.toFixed(2)
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Pago completado',
            text: 'Pago realizado por: ' + details.payer.name.given_name,
          });
          console.log('Detalles del pago:', details);
          this.askForPDFOption(details);
        });
      },
      onError: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el pago',
          text: 'Ocurrió un error durante el proceso de pago. Intenta nuevamente.',
        });
        console.error('Error en el pago:', err);
      }
    }).render('#paypal-button-container');
  }

  askForPDFOption(details: any): void {
    Swal.fire({
      title: '¿Deseas descargar el ticket o solo verlo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Descargar',
      cancelButtonText: 'Ver'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generatePDF(details, true); // Descargar el PDF
      } else {
        this.generatePDF(details, false); // Abrir el PDF en una nueva pestaña
      }
    });
  }

  generatePDF(details: any, download: boolean): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const mainColor: [number, number, number] = [91, 61, 153];
    const secondaryColor: [number, number, number] = [204, 186, 239];
    const borderColor: [number, number, number] = [167, 144, 207];

    doc.setFontSize(20);
    doc.setTextColor(mainColor[0], mainColor[1], mainColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Comprobante de Pago', pageWidth / 2, 20, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.line(10, 30, pageWidth - 10, 30);

    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.setFont('helvetica', 'normal');
    doc.text(`ID de Transacción: ${details.id}`, 10, 40);
    doc.text(`Nombre: ${details.payer.name.given_name} ${details.payer.name.surname}`, 10, 50);
    doc.text(`Correo: ${details.payer.email_address}`, 10, 60);
    doc.text(`Fecha: ${new Date(details.create_time).toLocaleDateString()}`, 10, 70);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(mainColor[0], mainColor[1], mainColor[2]);
    doc.text('Detalles de la Transacción', 10, 90);

    autoTable(doc, {
      head: [['Descripción', 'Monto']],
      body: [
        [`Coca-cola 3L`, `${details.purchase_units[0].amount.value} ${details.purchase_units[0].amount.currency_code}`]
      ],
      startY: 100,
      theme: 'grid',
      headStyles: { fillColor: mainColor },
      bodyStyles: { fillColor: secondaryColor, textColor: 50 },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      margin: { left: 10, right: 10 },
      tableLineColor: borderColor,
      tableLineWidth: 0.5
    });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(mainColor[0], mainColor[1], mainColor[2]);
    doc.text('Gracias por su compra. ¡Esperamos verte de nuevo pronto!', pageWidth / 2, 140, { align: 'center' });

    if (download) {
      doc.save('ticket_pago.pdf');
    } else {
      window.open(doc.output('bloburl'), '_blank');
    }
  }
}
