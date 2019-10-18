import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ServicioBaseService } from './servicio-base.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PalabrasService extends ServicioBaseService{

  constructor(public httpClient: HttpClient, public auth: AuthService) {
    super(httpClient, auth);
  }



}
