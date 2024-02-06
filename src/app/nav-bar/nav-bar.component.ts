import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../formularios/login/login.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  //Ahora en la version 17 de angular no se importa lo que necesitamos en modulos por separado
  //como para el manejo de rutas antes se importaba el approutingmodule en el modulo principal,
  //ahora se importa lo que necesitemos manejar de la ruta en este caso routerlink
  imports: [CommonModule, LoginComponent, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  isDarkMode: boolean = false;
  welcomeMessage: string = '';
  constructor(
    private darkModeService: DarkModeService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.darkModeService.isDarkMode.subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
    });
    this.messageService.welcomeMessage$.subscribe((message) => {
      this.welcomeMessage = message;
    });
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
  logout() {
    this.userService.logout().then(() => {
      // Borra el mensaje de bienvenida cuando el usuario cierra la sesión
      this.messageService.sendWelcomeMessage('');
    });
    localStorage.clear();
    sessionStorage.clear();
  }
}
