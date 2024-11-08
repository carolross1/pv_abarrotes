import { Component, OnInit } from '@angular/core';
import { MonedaService } from '../moneda.service';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrl: './moneda.component.scss'
})
export class MonedaComponent implements OnInit {
  rates: any;
  selectedCurrencyFrom: string = 'MXN'; // Moneda de origen
  selectedCurrencyTo: string = 'USD'; // Moneda de destino
  amount: number = 1; // Cantidad por defecto
  convertedAmount: number | null = null; // Cantidad convertida
  error: string = '';
  isFieldsVisible: boolean = false; // Estado de visibilidad de los campos

  // Lista de monedas para selección
  currencies: string[] = ['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND',
    'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK',
    'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD',
    'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID',
    'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU',
    'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN',
    'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS', 'SRD', 'SSP', 'STN',
    'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND',
    'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL']; // Agrega más monedas según sea necesario

  constructor(private exchangeRateService: MonedaService) { }

  ngOnInit(): void {
    this.getRates(this.selectedCurrencyFrom); // Obtén tasas de cambio inicial
  }

  getRates(baseCurrency: string): void {
    this.exchangeRateService.getExchangeRates(baseCurrency).subscribe(
      (data) => {
        this.rates = data.conversion_rates;
        this.error = '';
        this.convertCurrency(); // Convierte la cantidad inicial al cambiar las tasas
      },
      (err) => {
        this.error = 'Error al obtener las tasas de cambio';
        console.error(err);
      }
    );
  }

  // Método para convertir la cantidad
  convertCurrency(): void {
    if (this.rates) {
      const rateFrom = this.rates[this.selectedCurrencyFrom];
      const rateTo = this.rates[this.selectedCurrencyTo];
      if (rateFrom && rateTo) {
        this.convertedAmount = (this.amount * rateTo) / rateFrom; // Conversión
      } else {
        this.convertedAmount = null; // Si no hay tasa disponible
      }
    }
  }

  // Método para manejar el cambio de monedas
  onCurrencyChange(): void {
    this.convertCurrency(); // Convierte cuando se cambia la moneda
  }

  // Método para manejar el cambio de cantidad
  onAmountChange(): void {
    this.convertCurrency(); // Convierte cuando se cambia la cantidad
  }

  toggleFields(): void {
    this.isFieldsVisible = !this.isFieldsVisible; // Alternar visibilidad de campos
  }
}