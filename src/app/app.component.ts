import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet,
  provideRouter,
} from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  //Ahora el app.component.ts seria como nuestro app.module.ts
  imports: [RouterOutlet, NavBarComponent, RouterLink],
  providers: [AngularFireAuth],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gestortareas';
}
