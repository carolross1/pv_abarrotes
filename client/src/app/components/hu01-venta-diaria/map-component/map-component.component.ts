import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
declare var H: any;


@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrl: './map-component.component.css'
})
export class MapComponent implements AfterViewInit {
  private platform: any;
  private map: any;

  constructor() { 
    // Inicializar HERE platform con tu API Key
    this.platform = new H.service.Platform({
      apikey: 'DGuUpQIlLi36A7dduCUH5t9gZq9jCLOGXRMuM-2NxCQ'
    });
  }

  ngAfterViewInit(): void {
    // Configurar opciones del mapa
    const defaultLayers = this.platform.createDefaultLayers();

    // Inicializar el mapa
    const mapContainer = document.getElementById('map');
    this.map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
      zoom: 14,
      center: { lat: 0, lng: 0 }
    });

    // Permitir que el mapa sea interactivo
    const mapEvents = new H.mapevents.MapEvents(this.map);
    const behavior = new H.mapevents.Behavior(mapEvents);

    // Habilitar controles de la interfaz de usuario
    const ui = H.ui.UI.createDefault(this.map, defaultLayers);

    // Obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setMapCenter(lat, lng);
      }, error => {
        console.error('Error obteniendo la geolocalización', error);
      });
    } else {
      console.log('Geolocalización no soportada en este navegador');
    }
  }

  setMapCenter(lat: number, lng: number): void {
    const newCenter = { lat, lng };
    this.map.setCenter(newCenter);
    this.map.setZoom(14);

    // Agregar un marcador en la ubicación
    const marker = new H.map.Marker(newCenter);
    this.map.addObject(marker);
  }
}