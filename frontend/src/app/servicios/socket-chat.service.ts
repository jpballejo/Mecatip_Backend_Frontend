import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SocketChatService {
  public usuario_online$: BehaviorSubject<any> = new BehaviorSubject(null);
  public listaUserUpdate$: BehaviorSubject<any> = new BehaviorSubject(null);
  public salasUpdate$: BehaviorSubject<any> = new BehaviorSubject(null);
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
    this.chat.on('salasUpdate', data => this.salasUpdate$.next(data));
    this.chat.on('invChat', data => this.invChat$.next(data));
  }

  emitirCoso() {
    this.chat.emit('usuario_online', { dos: 2 });
  }

  limpiarSala(idSala) { this.chat.emit('limpiarSala', { idSala: idSala }); }

  crearSala(userCreator) {
    this.chat.emit('crearSala', { userCreator: userCreator });
    console.log("llega2");
 }


  public enviarMensaje(msg, sala){

    this.chat.emit('msgnew',{ msg: msg}, {sala: sala });

  }


  public obtenerSalas = () => {
    return Observable.create((observer) => {
        this.chat.on('darSalas', (sala) => {
            observer.next(sala);
        });
    });
  }

  public obtenerMensajes = (sala) => {
    return Observable.create((observer) => {
        this.chat.on('nuevosMsj', (message) => {
            observer.next(message);
        });
    });
}


public obtenerTodasSalas = () => {
  return Observable.create((observer) => {
      this.chat.on('salasUpdate', (sala) => {
        console.log(sala);
          observer.next(sala);
      });
  });
}



public pedirSalas(){

  this.chat.emit('SalasTodas');

}

}
