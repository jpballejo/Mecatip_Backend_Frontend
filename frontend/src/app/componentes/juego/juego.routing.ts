import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';
import { ChatComponent } from './chat/chat.component';
import { PrincipalComponent } from './principal/principal.component';
import { EsperaComponent } from './espera/espera.component';
const routes: Routes = [
  { path: "", redirectTo: "principal", pathMatch: "full" },
  { path: "principal", component: PrincipalComponent },
  { path: "juego", component: JuegoComponent },
  { path: "chat", component: ChatComponent },
  {path: "enespera", component: EsperaComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoRouting { }
