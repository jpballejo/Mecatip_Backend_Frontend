import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public usuario_online$: BehaviorSubject<any> = new BehaviorSubject(null);
  public listaUserUpdate$: BehaviorSubject<any> = new BehaviorSubject(null);
  private socket;
  private chat;
  private juego;
  constructor(public auth: AuthService) {

    this.juego = io.connect('http://localhost:3000/juego', {

      forceNew: true,
      'query': 'token=' + this.auth.getToken()
    });

    this.juego.open();
    this.juego.on('usuario_online', data => this.usuario_online$.next(data));
    this.juego.on('listaUserUpdate', data => this.listaUserUpdate$.next(data));

  }
  emitirCoso() {
    this.juego.emit('usuario_online', { dos: 2 });
  }
}
