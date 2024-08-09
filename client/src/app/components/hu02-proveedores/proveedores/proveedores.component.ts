import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {
  mensaje: string = "EN MANTENIMIENTO, VUELVA PRONTOO!!";

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes inicializar datos si es necesario
  }
}
