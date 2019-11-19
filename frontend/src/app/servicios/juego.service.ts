import { Injectable } from '@angular/core';
import { ServicioBaseService } from './servicio-base.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { partidaI } from '../interfaces/partida';
import { map, flatMap, filter } from 'rxjs/operators';
import { InfoPartidaI } from '../interfaces/infoPartidaI'
import { PalabrasI } from '../interfaces/palabras';
import { PalabrasService } from './palabras.service';
import { BehaviorSubject, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JuegoService extends ServicioBaseService {
  opciones;
  apiUrlJuego = this.apiURL + 'juego';
  constructor( public httpClient: HttpClient, public auth: AuthService, public palabrasService: PalabrasService) {
    super(httpClient, auth);
    this.auth.options$.subscribe(t => this.opciones = t);

  }
  getidPartida(): string { return localStorage.getItem('idPartida') }
  setIdPartida(idpartida: string) { localStorage.setItem('idPartida', idpartida) }

  altaPartida(tipo) {
    console.log('altaPartida: ', tipo);
    console.log('opciones: ', this.options);
    return this.httpClient.post<partidaI>(`${this.apiUrlJuego}/altapartida/${tipo}`, this.options)
      .pipe(map((res: partidaI) => {
        if (res) {
          console.log('RESPUESTA: ', res);
          return res;
        }
      }))
  }

  getPartida(idPartida): any | any[] {
    return this.httpClient.get<partidaI>(`${this.apiUrlJuego}/partida/${idPartida}`, this.options)
      .pipe(map((res: partidaI) => {
        if (res) {

          return res;
        }
      }))
  }
  eliminarPartida(idpartida): any {

    return this.httpClient.delete<partidaI>(`${this.apiUrlJuego}/borrarpartida/${idpartida}`, this.options).pipe(map((res: partidaI) => {
      if (res) {

        return res;
      }
    }))
  }

  getInfosPartida() {
    return this.httpClient.get<InfoPartidaI | InfoPartidaI[]>(`${this.apiUrlJuego}/infopartida/`, this.options)
      .pipe(map((res: InfoPartidaI) => {
        if (res) {
          return res;
        }
      }))
  }

  altaInfoPartida(infoPartida) {
    return this.httpClient.post<InfoPartidaI | any>(`${this.apiUrlJuego}/infopartida/${infoPartida}`, this.options)
      .pipe(map((res: InfoPartidaI) => {
        if (res) {
          return res;
        }
      }))
  }

  modificarInfoPartida(infoPartida) {

    return this.httpClient.put<InfoPartidaI | any>(`${this.apiUrlJuego}/infopartida/${infoPartida}`, this.options)
      .pipe(map((res: InfoPartidaI) => {
        if (res) {
          return res;
        }
      }))
  }

  borrarInfoPartidaById(idPartida, idInfoPartida) {
    return this.httpClient.delete<InfoPartidaI | any>(`${this.apiUrlJuego}/borrarInfoPartida//${idPartida}`, this.options)
      .pipe(map((res: InfoPartidaI) => {
        if (res) {
          return res;
        }
      }))
  }

  getPalabrasXlvl() {
    return forkJoin(Array.from(Array(12).keys()).map(e => this.palabrasService.PalabrasXlvl(e + 1)))

  }


}
