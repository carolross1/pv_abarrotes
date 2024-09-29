import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importamos Router para la navegación

@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrls: ['./redes-sociales.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class RedesSocialesComponent implements OnInit {
  constructor(private router: Router) {} // Inyección del servicio Router

  ngOnInit(): void {
    // Aquí puedes inicializar cualquier otra lógica si es necesario
  }

  // Método para manejar el cierre de sesión o regresar al login
  logout() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
