import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import {JuegoRouting} from './juego.routing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [JuegoComponent],
  imports: [
    CommonModule,
    JuegoRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[JuegoComponent]
})
export class JuegoModule { }
