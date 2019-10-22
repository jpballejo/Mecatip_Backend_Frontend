import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import {ChatComponent}from './chat/chat.component';
import {JuegoRouting} from './juego.routing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule} from 'ngx-socket-io';




@NgModule({
  declarations: [JuegoComponent,ChatComponent],
  imports: [
    CommonModule,
    JuegoRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule,


  ],
  providers:[],
  exports:[JuegoComponent,ChatComponent]
})
export class JuegoModule { }
