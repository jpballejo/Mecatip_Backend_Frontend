import { Component, OnInit } from '@angular/core';
import { UserI } from '../../../interfaces/user';


import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css']
})

export class EsperaComponent implements OnInit {
  public enEspera: [UserI];
  jugadores = [
    {
      name: 'jp',
      imagen: 'f/f3/Flag_of_Russia.svg'
    },
    {
      name: 'jp2',
      imagen: 'f/f3/Flag_of_Russia.svg'
    }, {
      name: 'jp3',
      imagen: 'f/f3/Flag_of_Russia.svg'
    }, {
      name: 'jp4',
      imagen: 'f/f3/Flag_of_Russia.svg'
    }
  ];
  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  ponerEnEspera(jugador) {
    for (let i = 0; i <= this.enEspera.length; i++) {
      if (this.enEspera[i].username == jugador.username) {
        return 'EXISTE';
      }
    }
    this.enEspera.push(jugador);
    return 'AGREGADO';
  };

  sacarDeEspera(jugador) {

    for (let i = 0; i <= this.enEspera.length; i++) {
      if (this.enEspera[i].username == jugador.username) {
        return 'Saque de espera al jugador en el indice: '+this.enEspera.splice(i, 1);
      }

    }

  }
  emitir() {

  }
};
