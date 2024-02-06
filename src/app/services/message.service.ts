// message.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private welcomeMessageSource = new Subject<string>();

  welcomeMessage$ = this.welcomeMessageSource.asObservable();

  sendWelcomeMessage(message: string) {
    this.welcomeMessageSource.next(message);
  }
}
