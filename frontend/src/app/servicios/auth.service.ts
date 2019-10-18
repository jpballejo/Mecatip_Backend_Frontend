import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../interfaces/user';
import { JwtResponseI } from '../interfaces/jwt-response';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthService {
  apiURL: string = `${environment.apiURL}`;//variable con la ruta http sacada de enviroment
  authSubject = new BehaviorSubject(false);
  private token: string;
  public options$ = new ReplaySubject(null);

  userSubject = new BehaviorSubject(false);

  /////////////////funciones-------------------------------//
  //**-----------------------------------------------------------------**//
  //////////CONSTRUCTOR
  constructor(private HttpClient: HttpClient) {
    //constructor viste
  }
  //////////Setter - Getter
  public setToken(token: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token
    this.setHeaders();
  }
  public setUser(user: JwtResponseI): void { localStorage.setItem('userSess', JSON.stringify(user)); }
  public getUser(): string {
    return localStorage.getItem('userSess');
  }
  public getToken(): string { if (!this.token) { this.token = localStorage.getItem('ACCESS_TOKEN'); } return this.token; }
  setHeaders() {
    console.log('token: ', this.token);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ' bearer ' + this.getToken()
    });
    this.options$.next({ headers });
  }

  //**-----------------------------------------------------------------**//
  //////////REGISTRARSE
  registrarse(user: UserI): Observable<JwtResponseI> {

    return this.HttpClient.post<JwtResponseI>(`${this.apiURL}signup/`, user)
    .pipe(map((res: JwtResponseI) => {
      if (res) {
        this.setToken(res.token);
        console.log(res);

      }
      return res;
    }))
  }
  //**-----------------------------------------------------------------**//
  //////////LOGIN
  login(user: UserI): Observable<JwtResponseI> {

    return this.HttpClient.post<JwtResponseI>(`${this.apiURL}login/`, user)
      .pipe(map(user => {
        console.log(user);
        this.setToken(user.token);
        return user;
      }));
  }
  /**/
  //**-----------------------------------------------------------------**//
  //////////LOGOUT
  logout(): void {
    this.token = '';
    this.setToken(null);
    console.log('Usuario logout...');
  }

  //**-----------------------------------------------------------------**//
  //////////REGISTRARSE
}
