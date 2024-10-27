import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

declare var paypal: any; // Declaramos la variable paypal

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.css']
})
export class PaypalPaymentComponent implements OnInit {
  private paypalLoaded: boolean = false; // Evita cargar el script de PayPal múltiples veces
  public total: number = 48; // Este es el total que quieres cobrar, puedes modificarlo dinámicamente
  public currency: string = 'MXN'; // Cambia este valor a 'EUR' para euros o 'MXN' para pesos mexicanos

  constructor() { }

  ngOnInit(): void {
    this.loadPayPalScript(); // Cargar el script de PayPal al iniciar el componente
  }

  // Cargar el script de PayPal de manera segura
  loadPayPalScript(): void {
    if (this.paypalLoaded) {
      this.initPayPalButton(); // Si ya está cargado, solo inicializa el botón
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${this.getClientId()}&currency=${this.currency}`; // Moneda dinámica
    script.onload = () => {
      this.paypalLoaded = true;
      this.initPayPalButton(); // Inicializar el botón una vez que el script esté cargado
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

  // Obtener el Client ID de manera segura
  getClientId(): string {
    return 'AQd7lGVQaJk523HiKsaOP4O8RL8LppPMEIj0dWfyu6Vzq0YUeGxVbGDLe5f7cxoseDCp5T25F4pRlcww'; // Reemplázalo con tu Client ID de PayPal
  }

  // Inicializar el botón de PayPal
  initPayPalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: this.currency, // Usa la moneda dinámica
              value: this.total.toFixed(2) // Establece el total que quieres cobrar
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
    }).render('#paypal-button-container'); // Renderizamos el botón de PayPal
  }
}
