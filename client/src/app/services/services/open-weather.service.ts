import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '0569b93cc08c7a5300245f0bdeacaa2e';  // API Key de OpenWeather

  constructor(private http: HttpClient) { }

  // Método para obtener el clima por ciudad
  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get<any>(url);  // Realiza la solicitud HTTP
  }
}
