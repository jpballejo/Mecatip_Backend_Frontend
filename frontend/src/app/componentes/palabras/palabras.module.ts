import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPalabrasComponent } from './listado-palabras/listado-palabras.component';
import { PalabrasRouting } from './palabras.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ListadoPalabrasComponent],
  imports: [
    NgbModule,
    CommonModule,
    PalabrasRouting,
  ],
  exports: [ListadoPalabrasComponent]
})
export class PalabrasModule { }
