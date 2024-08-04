import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-clientes-frecuentes',
  templateUrl: './lista-clientes-frecuentes.component.html',
  styleUrls: ['./lista-clientes-frecuentes.component.css']
})
export class ListaClientesFrecuentesComponent implements OnInit {
  // Objeto para mantener el estado de los desplegables
  dropdownOpen: { [key: string]: boolean } = {};
  clients: any[] = []; // Arreglo para almacenar los datos de los clientes

  constructor() {}

  ngOnInit(): void {
    // Cargar clientes desde localStorage al inicializar el componente
    this.loadClients();
  }

  toggleDropdown(key: string): void {
    // Primero, cerrar cualquier otro desplegable que esté abierto
    for (const dropdownKey in this.dropdownOpen) {
      if (dropdownKey !== key) {
        this.dropdownOpen[dropdownKey] = false;
      }
    }
    // Alternar el estado del desplegable actual
    this.dropdownOpen[key] = !this.dropdownOpen[key];
  }

  loadClients(): void {
    // Cargar clientes desde localStorage o usar un valor predeterminado
    this.clients = JSON.parse(localStorage.getItem('clients') || '[]');
  }

  updateClient(index: number): void {
    const client = this.clients[index];
    const name = prompt("Ingrese el nuevo nombre:", client.name);
    const email = prompt("Ingrese el nuevo correo electrónico:", client.email);
    const phone = prompt("Ingrese el nuevo número de teléfono:", client.phone);
    const frequency = prompt("Ingrese la nueva frecuencia de compra:", client.frequency);

    if (name && email && phone && frequency) {
      this.clients[index] = { ...client, name, email, phone, frequency };
      localStorage.setItem('clients', JSON.stringify(this.clients));
      this.loadClients(); // Recargar la lista después de actualizar
    }
  }

  deleteClient(index: number): void {
    this.clients.splice(index, 1);
    localStorage.setItem('clients', JSON.stringify(this.clients));
    this.loadClients(); // Recargar la lista después de eliminar
  }
}
