import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tareas } from '../../interfaces/listaTareas.interface';
import { TareasService } from '../../services/tareas.service';
import { UserService } from '../../services/user.service';
import { FormulariosModule } from '../../formularios/formularios.module';
import { ListaTareasComponent } from '../lista-tareas/lista-tareas.component';

@Component({
  selector: 'app-tabla-tareas',
  standalone: true,
  imports: [
    AngularFireAuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormulariosModule,
    ListaTareasComponent,
  ],

  templateUrl: './tabla-tareas.component.html',
  styleUrl: './tabla-tareas.component.css',
})
export class TablaTareasComponent implements OnInit {
  @Input() tareas: Tareas[] = [];
  @Input() descripcionBuscada: string = '';
  @Output() tareaEliminada: EventEmitter<Tareas> = new EventEmitter<Tareas>();
  tareaSeleccionada: Tareas | null = null;
  tareaSeleccionadaIndex: number | null = null;
  edicionExitosa: boolean = false;
  errorEdicion: string | null = null;
  constructor(
    private tareasService: TareasService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  eliminarTarea(tarea: Tareas) {
    this.tareasService.eliminarTarea(tarea).then(() => {
      this.tareaEliminada.emit(tarea);
    });
  }
  cambiarestadotarea(posicion: number) {
    this.tareas[posicion].realizada = !this.tareas[posicion].realizada;
    this.actualizarTarea(this.tareas[posicion]);
  }
  cambiarestadotareaProgreso(posicion: number) {
    this.tareas[posicion].en_progreso = !this.tareas[posicion].en_progreso;
    this.actualizarTarea(this.tareas[posicion]);
  }
  editarTarea(tarea: Tareas) {
    this.tareaSeleccionada = { ...tarea };
  }
  /*Esta funcion actualiza la tarea seleccionada con los datos que se ingresan en el formulario */
  actualizarTarea(tarea: Tareas) {
    this.tareasService
      .actualizarTarea(tarea)
      .then(() => {
        this.tareaSeleccionada = null;
        this.edicionExitosa = true;
      })
      .catch((error) => {
        console.error(error);
        this.errorEdicion =
          'Se ha producido un error al actualizar la tarea  intentelo mas tarde';
      });
  }
}
