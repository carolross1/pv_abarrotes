import { Component, OnInit } from '@angular/core';

declare var paypal: any; // Declaramos la variable paypal


  @Component({
    selector: 'app-paypal-payment',
    templateUrl: './paypal-payment.component.html',
    styleUrls: ['./paypal-payment.component.css']
  })
  

export class PaypalPaymentComponent implements OnInit {
  private paypalLoaded: boolean = false; // Evita cargar el script de PayPal múltiples veces

  public total: number = 0; // Este es el total que quieres cobrar, puedes modificarlo dinámicamente

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
    script.src = `https://www.paypal.com/sdk/js?client-id=${this.getClientId()}`;
    script.onload = () => {
      this.paypalLoaded = true;
      this.initPayPalButton(); // Inicializar el botón una vez que el script esté cargado
    };
    script.onerror = () => {
      console.error('Error al cargar el script de PayPal.');
    };
    document.body.appendChild(script);
  }

  // Obtener el Client ID de manera segura
  getClientId(): string {
    // Debes reemplazar esto con una fuente segura de tu Client ID
    return 'AQd7lGVQaJk523HiKsaOP4O8RL8LppPMEIj0dWfyu6Vzq0YUeGxVbGDLe5f7cxoseDCp5T25F4pRlcww'; // Reemplázalo con tu Client ID de PayPal
  }
  

  // Inicializar el botón de PayPal
  initPayPalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.total.toFixed(2) // Establece el total que quieres cobrar
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Pago realizado por: ' + details.payer.name.given_name);
          console.log('Detalles del pago:', details);
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
        alert('Ocurrió un error durante el proceso de pago. Intenta nuevamente.');
      }
    }).render('#paypal-button-container'); // Renderizamos el botón de PayPal
  }
}
