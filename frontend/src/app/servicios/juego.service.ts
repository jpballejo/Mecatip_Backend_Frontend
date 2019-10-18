import { Injectable } from '@angular/core';
import { ServicioBaseService } from './servicio-base.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class JuegoService extends ServicioBaseService{

  constructor(public httpClient: HttpClient, public auth: AuthService) {
    super(httpClient, auth);
  }
}
