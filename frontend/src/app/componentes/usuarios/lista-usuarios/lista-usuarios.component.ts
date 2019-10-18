import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/interfaces/user';
import { UserService } from '../../../servicios/user.service';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  users: UserI[];
  constructor(private servicioUsuario: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() { this.servicioUsuario.getUsuarios().subscribe((usuarios: UserI[]) => this.users = usuarios);
  console.log('getUsuarios'); }
}
