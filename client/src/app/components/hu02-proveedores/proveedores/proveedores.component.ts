import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedores';
import { LoginService } from '../../../services/login/login.service';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {
  mensaje: string = "EN MANTENIMIENTO, VUELVA PRONTOO!!";


  // Estado para los desplegables (si fuera necesario en este componente)
  dropdownOpen: { [key: string]: boolean } = {};

  constructor(
    private proveedoresService: ProveedoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService:LoginService
  ) {}


  ngOnInit(): void {
    // Aquí puedes inicializar datos si es necesario
  }
  logout() {
    const logoutRealizado = this.loginService.logout();
    if (!logoutRealizado) { 
      return;
    }
    
    console.log('Cierre de sesión realizado correctamente.');
  }
}
