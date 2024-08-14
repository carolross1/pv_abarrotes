import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/Usuario';
import { Router,ActivatedRoute} from '@angular/router';
import { LoginService } from '../../services/login/login.service';


@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent implements OnInit {
  createUserForm: FormGroup;
  isEdit: boolean = false;
  userId?: string;


  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,
     private router: Router,
     private route: ActivatedRoute,
     private loginService:LoginService
    ) {
       // Inicialización del FormGroup
       this.createUserForm = this.fb.group({
        id_Usuario: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10,13}$')]],
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}')]],
        tipo_Usuario: ['', Validators.required]
      });
  }

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.isEdit = true;
        this.loadUserData(this.userId);
      }
    });
  }
  loadUserData(id: string): void {
    this.usuarioService.getUser(id).subscribe(user => {
      if (user) {
        this.createUserForm.patchValue(user);
      }
    });
  }
 /*ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    
    if (this.userId) {
      this.isEdit = true;
      this.loadUser(this.userId); // Cargar los datos del usuario si el ID está presente
    }
  }*/

  onSubmit(): void {
    if (this.createUserForm.valid) {
      console.log('Formulario enviado con datos:', this.createUserForm.value);
      if (this.isEdit) {
        this.usuarioService.updateUser(this.userId!, this.createUserForm.value).subscribe(
          response => {
            console.log('Usuario actualizado:', response);
            alert('Usuario actualizado con éxito');
            this.router.navigate(['/listausuario']);
           //this.getUsers();
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
      } else {
      this.usuarioService.createUser(this.createUserForm.value).subscribe(
        response => {
          console.log('Usuario creado:', response);
          this.router.navigate(['/listausuario']); 
          alert('Nuevo usuario registrado con éxito');
         // this.getUsers();
        },
        error => {
          console.error('Error al crear el usuario:', error);
        }
      );
    }
  }
}
  
cancel(): void {
  this.router.navigate(['/listausuario']); // Opcional: redirige a la lista de usuarios
}

logout() {
  const logoutRealizado = this.loginService.logout();
  if (!logoutRealizado) { 
    return;
  }
  
  console.log('Cierre de sesión realizado correctamente.');
}

}