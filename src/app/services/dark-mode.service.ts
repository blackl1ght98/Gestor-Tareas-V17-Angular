// dark-mode-service.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  isDarkMode = this.darkMode.asObservable();

  toggleDarkMode() {
    this.darkMode.next(!this.darkMode.value);
    // Puedes agregar lógica adicional aquí, si es necesario.
  }
}
