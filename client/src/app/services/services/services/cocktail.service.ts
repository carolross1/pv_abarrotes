import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
  private translateApiUrl = 'https://translation.googleapis.com/language/translate/v2'; // URL de la API de Google Translate
  private apiKey = 'YOUR_GOOGLE_API_KEY'; // Reemplaza con tu clave de API de Google

  constructor(private http: HttpClient) { }

  // Método para obtener cócteles por nombre
  getCocktailsByName(name: string): Observable<any> {
    const url = `${this.apiUrl}/search.php?s=${name}`;
    return this.http.get<any>(url);
  }

  // Método para obtener una lista aleatoria de cócteles
  getRandomCocktail(): Observable<any> {
    const url = `${this.apiUrl}/random.php`;
    return this.http.get<any>(url);
  }

  // Método para traducir los ingredientes usando la API de Google Translate
  translateText(text: string): Observable<any> {
    const url = `${this.translateApiUrl}?key=${this.apiKey}`;
    const body = {
      q: text,
      target: 'es' // Código del idioma al que quieres traducir (español)
    };
    return this.http.post<any>(url, body).pipe(
      map(response => response.data.translations[0].translatedText)
    );
  }

  // Método para traducir una lista de ingredientes
  translateIngredients(ingredients: string[]): Observable<string[]> {
    const translationRequests = ingredients.map(ingredient => this.translateText(ingredient));
    return forkJoin(translationRequests);
  }
}
