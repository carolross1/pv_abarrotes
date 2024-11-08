import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private apiKey = 'b504532a0c70a9496b88473a'; // Reemplaza con tu clave API
  private baseUrl = 'https://v6.exchangerate-api.com/v6';

  constructor(private http: HttpClient) { }

  getExchangeRates(baseCurrency: string): Observable<any> {
    const url = `${this.baseUrl}/${this.apiKey}/latest/${baseCurrency}`;
    return this.http.get(url);
  }
}