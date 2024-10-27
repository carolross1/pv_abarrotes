import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../../services/services/open-weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherData: any;  // Aquí almacenaremos los datos del clima
  public city: string = 'Dolores Hidalgo'; // Puedes cambiar la ciudad a la que desees consultar

  // Nueva variable para almacenar más información de la ciudad
  public cityInfo: any = {
    name: '',
    coord: { lat: 0, lon: 0 },
    country: ''
  };

  constructor(private openWeatherService: OpenWeatherService, private router: Router) { }

  ngOnInit(): void {
    this.getWeather();  // Obtener el clima cuando el componente cargue
  }

  // Método para obtener el clima
  getWeather(): void {
    this.openWeatherService.getWeatherByCity(this.city).subscribe(
      data => {
        this.weatherData = data;

        // Almacenar información adicional de la ciudad
        this.cityInfo.name = data.name;
        this.cityInfo.coord = data.coord;
        this.cityInfo.country = data.sys.country;  // Información sobre el país

        console.log('Datos del clima:', this.weatherData);
        console.log('Información adicional de la ciudad:', this.cityInfo);
      },
      error => {
        console.error('Error al obtener los datos del clima:', error);
      }
    );
  }

  // Método para manejar el cierre de sesión o regresar al login
  logout() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
