import { Routes } from '@angular/router';
import { LoginComponent } from './formularios/login/login.component';
import { RegistroComponent } from './formularios/registro/registro.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListaTareasComponent } from './tareas/lista-tareas/lista-tareas.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
//Ahora no es un modulo de rutas sino una lista de rutas
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'registro', component: RegistroComponent, title: 'Registro' },
  { path: 'login', component: LoginComponent, title: 'Inicio de sesion' },
  {
    path: 'tareas',
    component: ListaTareasComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/registro'])),
    title: 'Tareas',
  },
  { path: '**', component: NotFoundComponent, title: 'no encontrado' },
];
