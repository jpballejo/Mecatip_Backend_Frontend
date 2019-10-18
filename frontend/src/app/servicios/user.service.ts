import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServicioBaseService } from './servicio-base.service';
import { AuthService } from './auth.service';
@Injectable({ providedIn: 'root' })

export class UserService extends ServicioBaseService {

  constructor(public httpClient: HttpClient, public auth: AuthService) {
    super(httpClient, auth);
  }



  public getUsuarios(): Observable<UserI[]> {
    console.log(this.options);
    return this.httpClient.get<UserI[]>(`${this.apiURL}users/`, this.options)
      .pipe(map((usuarios: any) => usuarios.map((users: UserI[]) => users)));
  }

  public deleteUsuario(idUser: string): Observable<UserI> {
    console.log(idUser);
    return this.httpClient.delete<UserI>(`${this.apiURL}users/borrar/${idUser}`, this.options)
      .pipe(map((usu: any) => usu.map((user: UserI) => user)));

  }


  /* public updateCustomer(customer: Customer){}

   public deleteCustomer(id: number){}

   public getCustomerById(id: number){}

   public getCustomers(url?: string){}
   */



}
