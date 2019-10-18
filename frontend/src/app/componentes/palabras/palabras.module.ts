import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaPalabraComponent } from './alta-palabra/alta-palabra.component';
import { ListadoPalabrasComponent } from './listado-palabras/listado-palabras.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular//common/http';
import { PalabrasRouting } from './palabras.routing';
import { PalabrasService } from '../../servicios/palabras.service';


@NgModule({
  declarations: [AltaPalabraComponent, ListadoPalabrasComponent],
  imports: [
    CommonModule,FormsModule,HttpClientModule,PalabrasRouting
  ],
  exports:[AltaPalabraComponent,ListadoPalabrasComponent],
  providers:[PalabrasService]
})
export class PalabrasModule { }
