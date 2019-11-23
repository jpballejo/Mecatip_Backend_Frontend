import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SocketJuegoService } from '../../../servicios/socket-juego.service'
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../servicios/auth.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy {

  aceptoPartida: boolean;
  modalOptions: NgbModalOptions;
  idPartida: string;
  user: string;
  my_modal_title: any;
  my_modal_content: any;
  modalAceptaDesafio: any;
  constructor(public socketAPI: SocketJuegoService, public router: Router, private modalService: NgbModal, public auth: AuthService, ) {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.socketAPI.palabrasPartida$.pipe(filter(u => u != null))
      .subscribe(u => {
        this.recibePalabras(u);
        console.log('palabrasPartida ', u);
      });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.socketAPI.empezar$.pipe(filter(p => p != null)).subscribe(this.empezar);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.socketAPI.idPartida$.pipe(filter(p => p != null)).subscribe(p => { console.log('idPartida', p); });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.socketAPI.infp$.pipe(filter(u => u != null)).subscribe(ip => { localStorage.setItem('INFP', JSON.stringify(ip)); console.log('INFOPARTIDA', ip) });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  ngOnInit() {

    this.socketAPI.teDesafio$.pipe(filter(u => u != null))
      .subscribe((u: string) => {
        console.log('Te desafio: ' + u);
        this.desafiado(u);

      });
  }
  open(titulo, contenido, u) {
    this.modalAceptaDesafio = this.modalService.open(ModalComponent);
    this.modalAceptaDesafio.componentInstance.my_modal_title = titulo;
    this.modalAceptaDesafio.componentInstance.my_modal_content = contenido;
    this.modalAceptaDesafio.componentInstance.resul.subscribe(r => { this.aceptoDesafio(r, u) });
  }

  desafiado(u: string) {
    this.user = u;
    this.open('Desafio Partida', 'El jugador: ' + u + ' te desafio.\n Aceptas?', u);
  }
  aceptoDesafio(result: boolean, user) {
    if (result) {
      this.socketAPI.aceptarDesafio(user);
      console.log('Acepte desafio de ', user);

    } else {
      console.log('Decline desafio de ', this.user);
      this.socketAPI.declinarDesafio(this.user);
    }
    this.modalAceptaDesafio.close()
  }
  empezar = (idPartida) => {
    if (idPartida) {
      console.log('Empezar ', idPartida);
      this.idPartida = idPartida;
      console.log('idid', this.idPartida);
      if (idPartida) {
        localStorage.removeItem('IDPARTIDA');
        localStorage.setItem('IDPARTIDA', idPartida);
        localStorage.setItem('CREATOR', '0');
        this.router.navigateByUrl(`/juego/vs/${idPartida}`);
      }
    }
  }
  getIdPartida() { return localStorage.getItem('IDPARTIDA'); }

  recibePalabras(pal) {
    console.log(pal);
    console.log("recibePalabras", pal);
    localStorage.removeItem('palNivel');
    localStorage.setItem('palNivel', JSON.stringify(pal));
  }
  ngOnDestroy() {



  }


  getInfoPartida = () => JSON.parse(localStorage.getItem('INFP'));

}
