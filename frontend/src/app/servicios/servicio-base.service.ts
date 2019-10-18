import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServicioBaseService {
  protected options = {}

  apiURL: string = `${environment.apiURL}`;//variable con la ruta http sacada de enviroment
  constructor(protected httpClient: HttpClient, protected auth: AuthService) {
    this.auth.options$.subscribe(o => {
      console.log('coso ', this)
      this.options = o
    })
  }

}
