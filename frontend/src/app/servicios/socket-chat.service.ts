import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class SocketChatService {
  public usuario_online$: BehaviorSubject<any> = new BehaviorSubject(null);
  public listaUserUpdate$: BehaviorSubject<any> = new BehaviorSubject(null);
  public invChat$: BehaviorSubject<any> = new BehaviorSubject(null);
  private chat;
  constructor(public auth: AuthService) {

    this.chat = io.connect('http://localhost:3000/chat', {

      forceNew: true,
      'query': 'token=' + this.auth.getToken()
    });
    this.chat.open();
    this.chat.on('usuario_online', data => this.usuario_online$.next(data));
    this.chat.on('listaUserUpdate', data => this.listaUserUpdate$.next(data));
    this.chat.on('invChat', data => this.invChat$.next(data));

  }

  emitirCoso() {
    this.chat.emit('usuario_online', { dos: 2 });
  }

  limpiarSala(idSala) { this.chat.emit('limpiarSala', { idSala: idSala }); }
  
}
