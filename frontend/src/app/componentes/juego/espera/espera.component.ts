import { Component, OnInit } from '@angular/core';
import { UserI } from '../../../interfaces/user';
import { SocketJuegoService } from '../../../servicios/socket-juego.service'
import { AuthService } from '../../../servicios/auth.service';
import { JuegoService } from '../../../servicios/juego.service';
import { map, filter } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { arraygo } from './array_nivel';
import { PalabrasI } from 'src/app/interfaces/palabras';
import { partidaI } from 'src/app/interfaces/partida';
import { dataSocketResponse } from '../../../interfaces/dataI';
@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css']
})

export class EsperaComponent implements OnInit {
  idPArtida: string;
  enEspera: UserI[] = [];
  jugadores = [];
  palabrasPartida$: BehaviorSubject<any[]> = new BehaviorSubject(null);
  nivel = arraygo.filter(n => n.nivel < 3);
  jugador = { username: null }
  restantes$ = new BehaviorSubject(null);
  closeResult: string;
  idPartida$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public juegoService: JuegoService,
    public socketAPI: SocketJuegoService,
    public auth: AuthService,
    public router: Router) {
    console.log('USERSESION ', auth.getUser());
    this.palabrasPartida$.pipe(filter(u => !!u && !!u.length)).subscribe(pala => {
      localStorage.setItem('palNivel', JSON.stringify(pala));
      this.socketAPI.palabrasParaPartida(this.idPArtida, pala);
    })
    this.socketAPI.empezar$.pipe(filter(p => p != null)).subscribe(this.empezar);
    this.idPartida$.pipe(filter(p => p != null))
      .subscribe(p => {
        this.idPArtida = p; this.lanzar(p);
      });
  }
  //, map((p: dataSocketResponse) => p)
  ngOnInit() {
    this.socketAPI.usuario_online$.pipe(filter(u => u != null)).subscribe(u => console.log('SOCKET', u))
    this.socketAPI.listaUserUpdate$.pipe(filter(u => u != null)).subscribe(u => console.log('USUARIOS ONLINE', u))
    this.socketAPI.aceptoDes$.pipe(filter(u => u != null)).subscribe((u) => {
      console.log('Acepto el desafio: ' + u); this.aceptoDesafio(u);
    });
    this.socketAPI.declinoDes$.pipe(filter(u => u != null)).subscribe(u => console.log(u));
  }
  ponerEnEspera(jug: UserI) {
    console.log('ENESPERA');
    console.log(jug);
    if (this.enEspera.indexOf(jug) > -1) { console.log('SAQUE'); return this.sacarDeEspera(jug); }
    this.enEspera.push(jug);
    console.log(this.enEspera);
    return console.log('AGREGADO');
  };
  sacarDeEspera(jugador) {
    this.enEspera.splice(this.enEspera.indexOf(jugador), 1)
  }
  desafiar() {
    if (this.enEspera.length > -1) {
      this.socketAPI.desafiar(this.enEspera);
      this.restantes$.next(this.enEspera.length);
    }
  }
  aceptoDesafio(u) {
    this.restantes$.next(u.acept.faltan);
    console.log('Acepto: ', u);
}
  crearPartida() {
    if (this.enEspera.length > -1)
      this.juegoService.altaPartida('VS').pipe(filter((p: partidaI) => p != null)).subscribe((par: partidaI) => {
        this.idPartida$.next(par.idPartida)
      });


  }
  async  lanzar(idPartida) {

    this.socketAPI.armarPartida(idPartida);
    await this.armarPalabras(idPartida);
    console.log('crearPartida', idPartida);
    console.log('Envio contrincantes', idPartida);
    let contrincantes: [] = [];

    this.socketAPI.contrincantes(idPartida, this.enEspera.map(u => u));
    this.socketAPI.empezar(idPartida);


  }
  async armarPalabras(idPartida) {

    await this.juegoService.getPalabrasXlvl()
      .pipe(filter(u => u != null))
      .subscribe(u => this.palabrasPartida$.next(this.manejarPalabras(u)));


  }
  empezar = (idPartida) => {
    console.log('Empezar ', idPartida);

    if (idPartida) {
      localStorage.removeItem('IDPARTIDA');
      localStorage.setItem('IDPARTIDA', idPartida);
      localStorage.setItem('CREATOR', '1');
      this.router.navigateByUrl(`/juego/vs/${idPartida}`);
    }
  }

  getIdPartida() { return localStorage.getItem('IDPARTIDA'); }
  manejarPalabras(arrayP) {
    return this.nivel.map((n) => {
      return {
        nivel: n.nivel,
        tiempo: n.tiempo,
        puntosSuma: n.puntosSuma,
        puntosResta: n.puntosResta,
        plus: n.plus,
        palabras: arrayP[n.nivel - 1].map(u => u.palabra_frase)
      }

    });


  }


};
