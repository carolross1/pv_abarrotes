import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
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
    this.createUserForm = this.fb.group({
      idUsuario: ['', [Validators.required, Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      telefono: ['', [Validators.required, Validators.maxLength(13), Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      contrasena: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')]],
      tipoUsuario: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.usuarioService.createUser(this.createUserForm.value).subscribe(
        response => {
          console.log('Usuario creado:', response);
          this.router.navigate(['/usuarios']); // Redirige a la lista de usuarios o a donde lo necesites
        },
        error => {
          console.error('Error al crear el usuario:', error);
        }
      );
    }
  }
}