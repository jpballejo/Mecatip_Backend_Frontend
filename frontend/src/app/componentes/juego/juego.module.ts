import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import { ChatComponent } from './chat/chat.component';
import { JuegoRouting } from './juego.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './principal/principal.component';
import { EsperaComponent } from './espera/espera.component';
import { SeleccionJugadorComponent } from './seleccion-jugador/seleccion-jugador.component';
import { JuegoVsComponent } from './juego-vs/juego-vs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
//import { BrowserModule } from '@angular/platform-browser';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ModalComponent, JuegoComponent, ChatComponent, PrincipalComponent, EsperaComponent, SeleccionJugadorComponent, JuegoVsComponent],
  imports: [
    CommonModule,
    JuegoRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule

  ],
  entryComponents: [
    ModalComponent

  ],

  providers: [],//NgbModule BrowserModule
  exports: [JuegoComponent, ChatComponent]
})
export class JuegoModule { }
