import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoPalabrasComponent } from './listado-palabras/listado-palabras.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular//common/http';
import { PalabrasRouting } from './palabras.routing';
import { PalabrasService } from '../../servicios/palabras.service';


@NgModule({
  declarations: [ ListadoPalabrasComponent],
  imports: [
    CommonModule,FormsModule,HttpClientModule,PalabrasRouting
  ],
  exports:[ListadoPalabrasComponent],
  providers:[PalabrasService]
})
export class PalabrasModule { }
