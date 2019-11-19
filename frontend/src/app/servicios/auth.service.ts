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
  usuario$ = new BehaviorSubject(null);
  token$ = new BehaviorSubject(null);

  /////////////////funciones-------------------------------//
  //**-----------------------------------------------------------------**//
  //////////CONSTRUCTOR
  constructor(private HttpClient: HttpClient) {
    //constructor viste
  }
  //////////Setter - Getter**************///////////////////////////////////////////////////////
  setToken(token: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token
    this.token$.next(token);
    console.log('Seteo token');
    this.setHeaders();
  }
  /////////////////////****************************************************************////////////////
  public getToken(): string { if (!this.token) { this.token = localStorage.getItem('ACCESS_TOKEN'); } return this.token; }
  public getToken$() { if (this.token$.getValue) return this.token$; return this.token$.next(this.getToken()); }
  /////////////////////****************************************************************////////////////

  setUser(user) { localStorage.setItem('userSess', JSON.stringify(user)); this.usuario$.next(user); }
  /////////////////////****************************************************************////////////////

  public getUser() {
    return JSON.parse(localStorage.getItem('userSess'));
  }
  /////////////////////****************************************************************////////////////

  limpiarSession() {
    localStorage.removeItem('userSess');
    localStorage.removeItem('ACCESS_TOKEN');
  }
  /////////////////////****************************************************************////////////////

  setHeaders() {
    console.log('token: ', this.getToken());
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ' bearer ' + this.getToken()
    });
    this.options$.next({ headers });
    localStorage.setItem('headers', JSON.stringify(headers));
  }
  getHeaders() { return JSON.parse(localStorage.getItem('headers')); }

  //**-----------------------------------------------------------------**//
  //////////REGISTRARSE
  registrarse(user: UserI): Observable<JwtResponseI> {

    return this.HttpClient.post<JwtResponseI>(`${this.apiURL}signup/`, user)
      .pipe(map((res: JwtResponseI) => {
        if (res) {
          this.setToken(res.token);
          this.setHeaders();
          console.log('respuesta signup: ' + res);
          this.setUser(res);
          return res;
        }
      }))
  }
  //**-----------------------------------------------------------------**//
  //////////LOGIN
  login(user: UserI): Observable<JwtResponseI> {

    return this.HttpClient.post<JwtResponseI>(`${this.apiURL}login/`, user)
      .pipe(map(user => {
        console.log('respuesta login: ' + user);
        this.setToken(user.token);
        this.setHeaders();
        this.setUser(user);
        return user;
      }));
  }
  /**/
  //**-----------------------------------------------------------------**//
  //////////LOGOUT
  logout(): void {
    this.token = '';
    this.setToken(null);
    this.limpiarSession();
    console.log('Usuario logout...');
  }

  //**-----------------------------------------------------------------**//
  //////////REGISTRARSE
}
