import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/servicios/user.service';
import { filter } from 'rxjs/operators';
import { UserI } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: FormGroup;

  constructor(private userApi: UserService, private router: Router) {
    this.user = new FormGroup({
      username: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl({ value: '', disabled: true })
    })
    if (this.USUARIO.username) {
      this.userApi.getUsuario(this.USUARIO.username)
        .pipe(filter(u => u != null)).subscribe(this.recibeUser)
    }
  }
  ngOnInit() {
  }
  recibeUser = (u: UserI) => {
    this.user.controls['username'].setValue(u.username);
    this.user.controls['nombre'].setValue(u.nombre);
    this.user.controls['apellido'].setValue(u.apellido);
    this.user.controls['email'].setValue(u.email);


  }

  salvar = () => this.userApi.modificarUser(this.user.value).pipe(filter(u => u != null)).subscribe(u => { alert("Usuario Modificado con exito"); this.router.navigateByUrl('/inicio') });

  get USUARIO() { return JSON.parse(localStorage.getItem('userSess')) }
}
