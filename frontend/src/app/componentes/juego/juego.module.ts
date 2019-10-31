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
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [JuegoComponent, ChatComponent, PrincipalComponent, EsperaComponent, SeleccionJugadorComponent, BrowserModule, NgbModule],
  imports: [
    CommonModule,
    JuegoRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule, NgbModule

  ],
  providers: [],
  exports: [JuegoComponent, ChatComponent, BrowserModule, NgbModule]
})
export class JuegoModule { }
