import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketJuegoService {





  ///////////////////////defino observables para los emit
  public usuario_online$: BehaviorSubject<any> = new BehaviorSubject(null);
  public listaUserUpdate$: Subject<any> = new BehaviorSubject(null);
  public devuelvo$: BehaviorSubject<any> = new BehaviorSubject(null);
  public teDesafio$: BehaviorSubject<any> = new BehaviorSubject(null);
  public aceptoDes$: BehaviorSubject<any> = new BehaviorSubject(null);
  public declinoDes$: BehaviorSubject<any> = new BehaviorSubject(null);
  public seConecto$: BehaviorSubject<any> = new BehaviorSubject(null);
  public terminado$: BehaviorSubject<any> = new BehaviorSubject(null);
  public palabrasPartida$: BehaviorSubject<any> = new BehaviorSubject(null);
  public empezar$: BehaviorSubject<any> = new BehaviorSubject(null);
  public idPartida$: BehaviorSubject<any> = new BehaviorSubject(null);
  public comienza$: BehaviorSubject<any> = new BehaviorSubject(null);
  public go$: BehaviorSubject<any> = new BehaviorSubject(null);
  public goo$: BehaviorSubject<any> = new BehaviorSubject(null);
  public cambiarPalabra$: BehaviorSubject<any> = new BehaviorSubject(null);
  public resultadoJugador$: BehaviorSubject<any> = new BehaviorSubject(null);
  public terminar$: BehaviorSubject<any> = new BehaviorSubject(null);
  public dificil$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public infp$: BehaviorSubject<any> = new BehaviorSubject(null);




  ////////////////////defino NSP
  private juego;
  constructor(public auth: AuthService) {

    this.juego = io.connect('http://localhost:3000/juego', {

      'query': 'token=' + this.auth.getToken()
    });

    /////////////////defino los observables que van a escuchar
    this.juego.open();
    this.juego.on('usuario_online', data => this.usuario_online$.next(data));
    this.juego.on('listaUserUpdate', data => this.listaUserUpdate$.next(data));
    this.juego.on('devuelvo', data => this.devuelvo$.next(data));
    this.juego.on('teDesafio', data => this.teDesafio$.next(data));
    this.juego.on('aceptoDes', data => this.aceptoDes$.next(data));
    this.juego.on('declinoDes', data => this.declinoDes$.next(data));
    this.juego.on('empezar', data => this.empezar$.next(data.idPartida));
    this.juego.on('palabrasParaPartida', data => this.palabrasPartida$.next(data.data));
    this.juego.on('idPart', data => this.idPartida$.next(data));
    this.juego.on('comienza', data => this.comienza$.next(data));
    this.juego.on('goo', data => this.goo$.next(data));
    this.juego.on('cambiarPalabra', data => this.cambiarPalabra$.next(data));
    this.juego.on('resultadoJugador', ({ data }) => this.resultadoJugador$.next(data));
    this.juego.on('terminar', ({ data }) => this.terminar$.next(data));
    this.juego.on('dificil', ({ data }) => this.dificil$.next(data));
    this.juego.on('infp', ({ data }) => this.infp$.next(data));
    //  this.juego.on('terminado', ({ data }) => this.terminado$.next(data));


  }

  /////////////////////////////////FUNCIONES a usar///////////////////////////////////////////////////////////////////

  //*******************************************CONTROL PARTIDA_______________________________________________________
  desafiar = (userDess) => {
    this.juego.emit('desafiar', userDess);
  }
  aceptarDesafio = (uRetador) => {
    console.log('aceptoDesafio');
    this.juego.emit('aceptoDesafio', uRetador);
  }
  declinarDesafio = (uRetador) => {
    this.juego.emit('declinarDesafio', uRetador);
  }

  armarPartida = (idPartida) => {
    this.juego.emit('armarPartida', { idPartida: idPartida });
  }

  finPartida = (idPartida) => {
    this.juego.emit('finPartida', { idPartida, data: true, username: null });
  }

  palabrasParaPartida = (idPartida, palabras) => {

    this.juego.emit('palabrasPartida', { idPartida: idPartida, data: palabras, username: null });
  }
  arrancar = (idPartida) => {
    this.juego.emit('empezar', { idPartida: idPartida, data: 'GO', username: null });
  }

  go = (idPartida: string) => {
    this.juego.emit('comenzar', { idPartida: idPartida, data: 'GO', username: null });
  }

  goo = (idPartida, nivel) => {
    this.juego.emit('goo', { idPartida: idPartida, data: nivel, username: null })
  }

  cambiarPalabra = (idPartida, index) => {
    this.juego.emit('cambioPalabra', { idPartida: idPartida, data: index, username: null })
  }
  //*******************************************|||||||||||||||||_______________________________________________________
  resultadoFinal = (idPartida, puntos, jugador) => {
    this.juego.emit('resultadoFinal', { idPartida, data: { puntos, jugador }, username: null })
  }

  dificultad = (idPartida, dif) => {
    this.juego.emit('dificultad', { idPartida, data: dif, username: null });

  }
  infoPartida = (idPartida, infoPartida) => {
    this.juego.emit('infopartida', { idPartida, data: infoPartida, username: null });

  }
  eliminarSala = (idPartida) => this.juego.emit('eliminarSala', { idPartida, data: true, username: null })
  //*******************************************GESTION DURANTE PARTIDA_________________________________________________


  idPartida(idPartida) {
    this.juego.emit('idPartida', { idPartida: idPartida, palabras: null, username: null });

  }
  empezar(idPartida) {
    this.juego.emit('empezar', { idPartida: idPartida, data: 'GO', username: null });
  }
  //*******************************************|||||||||||||||||_______________________________________________________

  //******************************************* PARTIDA_________________________________________________




  //*******************************************|||||||||||||||||_______________________________________________________

  /////////////////////////////////FUNCIONES FIN////////////////////////////////////////////////////////////////////////

}
