import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Inicializar el mapa en una ubicación predeterminada
    const map = L.map('map', {
      dragging: true,
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: true
    }).setView([21.153870815136134, -100.93065831029644], 13);

    // Agregar capa de título (tile layer)
    L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=uYrDyiPSmieNZKXRkZz9', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(map);

    // Crear el ícono de la tienda usando un HTML personalizado
    const storeIcon = L.divIcon({
      className: 'custom-icon-store',
      html: '<i class="fas fa-store" style="color: blue; font-size: 30px;"></i>', // Color azul y tamaño reducido
      iconSize: [30, 30], // Tamaño del icono
      iconAnchor: [15, 30],
      popupAnchor: [1, -30],
    });

    // Crear el ícono de usuario usando un HTML personalizado
    const userIcon = L.divIcon({
      className: 'custom-icon-user',
      html: '<i class="fas fa-user" style="color: green; font-size: 30px;"></i>', // Color verde y tamaño reducido
      iconSize: [30, 30], // Tamaño del icono
      iconAnchor: [15, 30],
      popupAnchor: [1, -30],
    });

    // Definir la ubicación de destino (ubicación de la tienda)
    const destinationLocation: L.LatLngTuple = [21.147938529816237, -100.9303132576345];

    // Agregar un marcador en la ubicación de destino (tienda) usando el ícono personalizado de tienda
    const destinationMarker = L.marker(destinationLocation, { icon: storeIcon }).addTo(map)
      .bindPopup('Ubicación de la tienda');

    // Intentar obtener la ubicación actual del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation: L.LatLngTuple = [position.coords.latitude, position.coords.longitude];

        // Agregar un marcador en la ubicación del usuario usando el ícono personalizado de usuario
        const userMarker = L.marker(userLocation, { icon: userIcon }).addTo(map)
          .bindPopup('Ubicación actual').openPopup();

        // Definir Routing como any
        const Routing: any = (L as any).Routing;

        // Crear la ruta desde la ubicación del usuario hacia la ubicación de la tienda
        const routingControl = Routing.control({
          waypoints: [
            L.latLng(userLocation[0], userLocation[1]), // Ubicación actual
            L.latLng(destinationLocation[0], destinationLocation[1]) // Ubicación de destino (tienda)
          ],
          createMarker: () => null // Deshabilitar los iconos predeterminados de los waypoints
        }).addTo(map);

        // Ajustar el mapa para mostrar ambas ubicaciones
        map.fitBounds(routingControl.getWaypoints().map((waypoint: any) => waypoint.latLng));
      }, () => {
        alert('Error al obtener la ubicación. Asegúrate de que los servicios de ubicación están habilitados.');
      });
    } else {
      alert('Geolocalización no es soportada en este navegador.');
    }
  }
}
