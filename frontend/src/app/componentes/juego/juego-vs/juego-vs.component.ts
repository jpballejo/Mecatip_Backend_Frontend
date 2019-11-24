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
  intervalSub: Subscription = null;
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


  constructor(
    public juegoService: JuegoService,
    public socketAPI: SocketJuegoService,
    public auth: AuthService,
    public router: Router) {
    ////////////////////////////////////////////////SUBSCRIPCIONES////////////////////////////////////////////////////////////////////////

    ////////////////__________________-------------------___________________//////////////////////////////////////////////////////////////
    this.socketAPI.comienza$.pipe(filter(u => u != null)).subscribe(u => {
      console.log('COMIENZA', u);
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
    this.nivel$.pipe(filter(u => u != null), filter(u => this.PALABRAS.length > -1)).subscribe(((n) => {
      console.log('palabras length', this.PALABRAS.length);
      console.log('pala', this.PALABRAS[this.PALABRAS.length - 1]);
      console.log('NIVEL ERROR ', this.PALABRAS[this.PALABRAS.length - 1].nivel)
      if (this.PALABRAS[this.PALABRAS.length - 1].nivel < n) {
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
    this.socketAPI.terminar$.pipe(filter(u => u == true)).subscribe(u => { this.limpiar() });//ejecuta la funcion terminar
    //this.socketAPI.terminado$.pipe(filter(u => u == true)).subscribe(u => { console.log('REDIRIGIENDO'); this.router.navigateByUrl('/juego/principal') });//una vez se limpia la sala se emite terminado
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
  finPartida = () => { console.log('FinPartida: ', this.getIdPartida()); if (this.CREATOR) { this.socketAPI.finPartida(this.getIdPartida()) } }
  /////////////////////**********************************************/////////////////////

  /////////////////////**********************************************/////////////////////
  limpiar = () => {
    console.log('Limpiar ejecutado!');
    console.log('soy creador?', this.CREATOR);

    let idPartida = this.getIdPartida();
    localStorage.removeItem('palNivel');
    localStorage.removeItem('INFP');
    localStorage.removeItem('IDPARTIDA');
    if (this.CREATOR) {
      console.log('I AM CREATOR')
      this.socketAPI.eliminarSala(idPartida);
    }
    localStorage.removeItem('CREATOR');
    this.router.navigateByUrl('/inicio');
    }
  /////////////////////**********************************************/////////////////////
  //limpiarSala = (idPartida) => { console.log('CREATOR: ', this.CREATOR); this.socketAPI.limpiarSala(idPartida); }
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
  dificultad = (val) => { this.socketAPI.dificultad(this.getIdPartida(), val); console.log('dificultad') }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  altaInfoPartida = () => {
    /* let infoPartida = {
        idPartida: this.getIdPartida(),
        creador: this.getInfoPartida().creador,
        contrincantes: this.getInfoPartida().contrincantes,
        puntos_ganados: this.puntosGanados,
        puntos_perdidos: this.puntosPerdidos,
        nivelAlcanzado: this.nivel$.value,
        jugada: true,
      };*/
    console.log('INFOPARTIDA', this.getInfoPartida());
    //  this.juegoService.altaInfoPartida(infoPartida).subscribe((error) => console.log, (complete) => { console.log('infoPartidaCreado') });
  }


  get CREATOR() {
    return !!parseInt(localStorage.getItem('CREATOR'));
  }
  get PALABRAS(): palabrasXlvlI[] {
    return JSON.parse(localStorage.getItem('palNivel')) || [];
  }
  getInfoPartida = () => JSON.parse(localStorage.getItem('INFP'));
}
