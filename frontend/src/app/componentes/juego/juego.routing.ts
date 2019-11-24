import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';

import { PrincipalComponent } from './principal/principal.component';
import { EsperaComponent } from './espera/espera.component';
import{JuegoVsComponent} from './juego-vs/juego-vs.component';
const routes: Routes = [
  { path: "", redirectTo: "principal", pathMatch: "full" },
  { path: "principal", component: PrincipalComponent },
  { path: "juego", component: JuegoComponent },
  {path: "enespera", component: EsperaComponent},
  {path: "vs/:idPartida", component: JuegoVsComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoRouting { }
