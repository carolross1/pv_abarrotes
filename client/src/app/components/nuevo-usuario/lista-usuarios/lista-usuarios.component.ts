import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
  //@Output() edit = new EventEmitter<Usuario>();
  Usuario: Usuario[] = [];
 /* searchId: string = '';*/

  constructor(private usuarioService: UsuarioService,private router:Router,
    private loginService:LoginService
  ) {}
  public dropdownOpen: { [key: string]: boolean } = {}; // Estado de los desplegables
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usuarioService.getUsers().subscribe(users => {
      this.Usuario = users;
    });
  }
 /* searchUser(): void {
    if (this.searchId.trim() === '') {
      this.getUsers();
    } else {
      this.usuarioService.getUser(this.searchId).subscribe(user => {
        this.Usuario = user ? [user] : [];
      });
    }
  }*/
    editUser(id: string): void {
      this.router.navigate(['/usuario/editar',id]) 
    } 

  deleteUser(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.deleteUser(id).subscribe(() => {
        this.getUsers();
      });
    }
  }
  addUser(): void {
    this.router.navigate(['/usuario']); 
  }
  toggleDropdown(key: string) {
    // Primero, cerrar cualquier otro desplegable que esté abierto
    for (const dropdownKey in this.dropdownOpen) {
      if (dropdownKey !== key) {
        this.dropdownOpen[dropdownKey] = false;
      }
    }
    // Alternar el estado del desplegable actual
    this.dropdownOpen[key] = !this.dropdownOpen[key];

  }
  logout() {
    const logoutRealizado = this.loginService.logout();
    if (!logoutRealizado) { 
      return;
    }
    
    console.log('Cierre de sesión realizado correctamente.')

}

}
