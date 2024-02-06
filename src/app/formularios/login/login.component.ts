import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  //Ahora en la version 17 de angular no se importa lo que necesitamos en modulos por separado
  //ahora lo podemos poner lo que necesitemos en el componente. NOTA: EL CommonModule SIEMPRE
  //PONERLO EN TODOS LOS COMONENTES PARA NO TENER PROBLEMAS CON EL USO DE LAS DIRECTIVAS DE
  //ANGULAR COMO *ngif, *ngclass...
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  loginError: boolean = false;
  usuarioLogueado: string | null = null;
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formulario.valid) {
      const email = this.formulario.value.email;
      const password = this.formulario.value.password;

      this.userService
        //Si el email y password es correcto inicia sesion
        .login({ email, password })
        .then((response) => {
          // Inicio de sesión exitoso
          console.log(response);
          this.router.navigate(['/tareas']);
        })
        .catch((error) => {
          // Error de inicio de sesión
          console.log(error);
          this.loginError = true;
        });
    }
  }
}
