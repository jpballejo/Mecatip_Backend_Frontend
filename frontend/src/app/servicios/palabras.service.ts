import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServicioBaseService } from './servicio-base.service';
import { AuthService } from './auth.service';
import { PalabrasI } from '../interfaces/palabras';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PalabrasService extends ServicioBaseService {
  apiUrl = this.apiURL + 'palabras';

  constructor(public httpClient: HttpClient, public auth: AuthService) {
    super(httpClient, auth);
  }

  PalabrasXlvl(lvl): Observable<PalabrasI[]> {

    return this.httpClient.get<PalabrasI[]>(`${this.apiUrl}/nivel/${lvl}`, this.options)
      .pipe(map((u) => u));
  }


  getPalabra(pal) { }
  altaPalabra(pal) { }
  eliminarPalabra(pal) { }




}
