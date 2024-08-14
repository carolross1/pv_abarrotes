import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
  //@Output() edit = new EventEmitter<Usuario>();
  Usuario: Usuario[] = [];
 /* searchId: string = '';*/

  constructor(private usuarioService: UsuarioService,private router:Router) {}

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
  /*addUser(): void {
    this.router.navigate(['/usuario']); // Redirige al formulario para agregar un nuevo usuario
  }*/

}
