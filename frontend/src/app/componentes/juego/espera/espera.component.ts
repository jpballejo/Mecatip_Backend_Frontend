import { Component, OnInit } from '@angular/core';
import { UserI } from '../../../interfaces/user';
import { SocketService } from '../../../servicios/socket.service'

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css']
})

export class EsperaComponent implements OnInit {
  enEspera: UserI[] = [];

  jugador = { username: null }
  jugadores = [
    {
      username: 'jp',
      imagen: 'f/f3/Flag_of_Russia.svg'
    },
    {
      username: 'jp2',
      imagen: 'f/f3/Flag_of_Russia.svg'
    }, {
      username: 'jp3',
      imagen: 'f/f3/Flag_of_Russia.svg'
    }, {
      username: 'jp4',
      imagen: 'f/f3/Flag_of_Russia.svg'
    }
  ];
  closeResult: string;

  constructor(private modalService: NgbModal, public socketAPI: SocketService) { }
  no() {
    this.socketAPI.emitirCoso()
  }
  ngOnInit() {
    this.socketAPI.usuario_online$.subscribe(u => console.log('viene de socket', u))
    this.socketAPI.listaUserUpdate$.subscribe(u => console.log('USUARIOS', u))
  }
  ponerEnEspera(jug: UserI) {
    console.log(jug);

    /*
    if (this.enEspera.length) {
      for (let i = 0; i <= this.enEspera.length; i++) {
        console.log('aca',this.enEspera);
        if (this.enEspera[i].username == jug.username) {
          return 'EXISTE';
        }
      }
    }
    */
    if (this.enEspera.indexOf(jug) > -1) { console.log('SAQUE'); return this.sacarDeEspera(jug); }
    this.enEspera.push(jug);
    console.log(this.enEspera);
    return console.log('AGREGADO');
  };

  sacarDeEspera(jugador) {
    this.enEspera.splice(this.enEspera.indexOf(jugador), 1)

  }
  emitir() {

  }
};
