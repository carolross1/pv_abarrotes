import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private alertaSubject = new BehaviorSubject<string | null>(null);
  alerta$ = this.alertaSubject.asObservable();

  showNotification(message: string) {
    this.alertaSubject.next(message);
    setTimeout(() => {
      this.alertaSubject.next(null);
    }, 3000); // La notificación desaparecerá después de 3 segundos
  }
}