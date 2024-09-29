import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importamos Router para la navegación

@Component({
    selector: 'app-direccion-pago',
    templateUrl: './direccion-pago.component.html',
    styleUrls: ['./direccion-pago.component.css']
})
export class DireccionPagoComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit(): void {
        // Aquí puedes inicializar cualquier otra lógica si es necesario
    }

    // Método para manejar el cierre de sesión o regresar al login
    logout() {
        // Redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
    }
}
