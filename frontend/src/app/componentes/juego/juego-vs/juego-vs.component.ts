import { Component, OnInit } from '@angular/core';
import { UserI } from '../../../interfaces/user';
import { PalabrasI } from '../../../interfaces/palabras';
import { SocketJuegoService } from '../../../servicios/socket-juego.service'
import { AuthService } from '../../../servicios/auth.service';
import { JuegoService } from '../../../servicios/juego.service';
import { map, filter } from 'rxjs/operators';
import { interval, timer } from 'rxjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { palabrasXlvlI } from '../../../interfaces/palabrasXlvl';
@Component({
  selector: 'app-juego-vs',
  templateUrl: './juego-vs.component.html',
  styleUrls: ['./juego-vs.component.css']
})

export class JuegoVsComponent implements OnInit {
  puntosGanados: number = 0;
  puntosPerdidos: number = 0;
  dificil: Boolean = false;
  contrincantes: [] = [];
  intervalSub: Subscription = null;
  altaInfoPartida() {
    //batiPArtida
    let infoPartida = {

      idPartida: this.getIdPartida(),
      contrincantes: this.contrincantes,
      puntos_ganados: this.puntosGanados,
      puntos_perdidos: this.puntosPerdidos,
      nivelAlcanzado: this.nivel$.value,
      jugada: true,
    };
    console.log('INFOPARTIDA', infoPartida);
    //  this.juegoService.altaInfoPartida(infoPartida).subscribe((error) => console.log, (complete) => { console.log('infoPartidaCreado') });
  }
  public arrayPuntajes: any[] = [];
  public puntaje = 0;
  seg$: BehaviorSubject<number> = new BehaviorSubject(null);
  comienza$: BehaviorSubject<number> = new BehaviorSubject(null);
  idPartida: string;
  nivel$: BehaviorSubject<number> = new BehaviorSubject(0);
  palabrasXlvl$: BehaviorSubject<palabrasXlvlI> = new BehaviorSubject(null);
  masterOfTimer$: BehaviorSubject<number> = new BehaviorSubject(null);//este es clave
  indexPalabra$: BehaviorSubject<number> = new BehaviorSubject(null);
  PALABRA: string = null;
  escribiendo: string = '';

  get CREATOR() {
    return !!parseInt(localStorage.getItem('CREATOR'));
  }
  get PALABRAS(): palabrasXlvlI[] {
    return JSON.parse(localStorage.getItem('palNivel')) || [];
  }

  constructor(public juegoService: JuegoService, public socketAPI: SocketJuegoService, public auth: AuthService, public router: Router) {
    ////////////////////////////////////////////////SUBSCRIPCIONES////////////////////////////////////////////////////////////////////////
    this.socketAPI.contrincantes$.subscribe(d => this.contrincantes = d.map(u => u));
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////

    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////
    this.socketAPI.comienza$.pipe(filter(u => u != null)).subscribe(u => {
      this.idPartida = u;
      this.siguienteNivel();
    });
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////
    this.socketAPI.dificil$.subscribe(d => { this.dificil = d; console.log('dificil', d); });
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////
    this.socketAPI.resultadoJugador$.pipe(filter(p => !!p)).subscribe((data) => {
      this.arrayPuntajes.push(data);
      this.arrayPuntajes = this.arrayPuntajes.sort((a, b) => b.puntos - a.puntos)
      console.log('PUNTAJE ', data, this.arrayPuntajes);
    })
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////
    this.socketAPI.cambiarPalabra$
      .pipe(filter(() => this.indexPalabra$.value !== null))
      .subscribe(i => this.indexPalabra$.next(this.indexPalabra$.value + 1));
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////
    this.nivel$
      .pipe(filter(() => this.CREATOR))
      .subscribe(this.go);
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////

    this.nivel$.subscribe(((n) => {
      if (this.PALABRAS[this.PALABRAS.length - 1].nivel == n) {
        this.socketAPI.resultadoFinal(this.idPartida, this.puntaje, JSON.parse(localStorage.getItem('userSess')));
        this.altaInfoPartida();
        this.intervalSub.unsubscribe();
      } else {
        this.palabrasXlvl$.next(this.PALABRAS[n - 1])
        this.indexPalabra$.next(0)
      }
    }));
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////

    this.indexPalabra$
      .pipe(filter(() => !!this.palabrasXlvl$.value && !!this.PALABRAS && !!this.PALABRAS.length))
      .subscribe(this.palabra);
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////

    this.seg$
      .pipe(filter(s => !!this.palabrasXlvl$.value && this.palabrasXlvl$.value.tiempo == s))
      .pipe(filter(() => this.CREATOR))
      .subscribe(() => this.socketAPI.cambiarPalabra(this.getIdPartida(), this.indexPalabra$.value + 1))
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////
    this.socketAPI.terminar$.pipe(filter(u => !!u)).subscribe(u => { this.terminado() });//this.terminar()
    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////
  }

  ngOnInit() {


  }


  ////////////////////////////////////////FUNCIONES////////////////////////////////////////

  arrancar = () => {
    console.log('ARRANCAR');
    this.socketAPI.go(this.getIdPartida());
  }
  /////////////////////**********************************************/////////////////////
  siguienteNivel = () => this.nivel$.next(this.nivel$.value + 1);
  /////////////////////**********************************************/////////////////////
  go = (nivel: number) => this.socketAPI.goo(this.getIdPartida(), nivel);
  /////////////////////**********************************************/////////////////////
  palabra = (index: number) => {
    if (this.nivel$.value == 1 && !index) {
      this.puntaje = 0;
    } else {
      const nivel = this.PALABRAS[this.nivel$.value - (index == 0 ? 2 : 1)]
      const palabra = nivel.palabras[index == 0 ? nivel.palabras.length - 1 : index - 1]
      console.log(this.nivel$.value, this.indexPalabra$.value, nivel, palabra)
      if (!!nivel && !this.escribiendo.localeCompare(palabra)) {
        this.puntaje += nivel.puntosSuma;
        this.puntosGanados += nivel.puntosSuma;

      }
      else {
        if (this.dificil == true) {
          console.log('DIFICIL');
          this.puntaje -= nivel.puntosResta;
          this.puntosPerdidos += nivel.puntosResta;
        }
      }
    }
    if (index == this.palabrasXlvl$.value.palabras.length) return this.siguienteNivel()
    if (this.intervalSub)
      this.intervalSub.unsubscribe();
    this.intervalSub = interval(1000).subscribe(t => this.seg$.next(t));
    this.PALABRA = this.palabrasXlvl$.value.palabras[index];
    this.escribiendo = ''
  }
  /////////////////////**********************************************/////////////////////
  finPartida = () => { console.log('FinPartida: ', this.getIdPartida()); this.socketAPI.finPartida(this.getIdPartida()); }
  /////////////////////**********************************************/////////////////////
  terminado = () => {
    console.log('TERMINAR ejecutado!');
    this.limpiar();
    console.log('TERMINAR redirigiendo...');
    this.router.navigateByUrl('/juego/principal/');
  }
  /////////////////////**********************************************/////////////////////
  limpiar = () => {
    console.log('Limpiar ejecutado!');
    localStorage.removeItem('IDPARTIDA');
    localStorage.removeItem('CREATOR');
    localStorage.removeItem('palNivel');
    console.log('Limpiar limpio localStorage');
    this.socketAPI.contrincantes$.unsubscribe();
    this.socketAPI.idPartida$.unsubscribe();
    this.socketAPI.comienza$.unsubscribe();
    this.socketAPI.dificil$.unsubscribe();
    this.socketAPI.resultadoJugador$.unsubscribe();
    this.socketAPI.cambiarPalabra$.unsubscribe();
    this.socketAPI.terminar$.unsubscribe();
    console.log('Limpiar aplico unsubscribe a los observables');
  }
  /////////////////////**********************************************/////////////////////
  tiempoCorre(t) { console.log(t); }
  /////////////////////**********************************************/////////////////////
  limpiarNivel = () => {
    for (let n = 1; n < 13; n++) {
      localStorage.removeItem(`lvl${n}`);
    }
  }
  /////////////////////**********************************************/////////////////////
  setIdPartida = (idPartida) => {
    if (idPartida) {
      localStorage.removeItem('IDPARTIDA');
      localStorage.setItem('IDPARTIDA', idPartida);
    }
  }
  /////////////////////**********************************************/////////////////////
  getIdPartida = () => localStorage.getItem('IDPARTIDA');
  /////////////////////**********************************************/////////////////////
  dificultad = (val) => this.socketAPI.dificultad(this.getIdPartida(), val);
}
