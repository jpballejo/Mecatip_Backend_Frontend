import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: "", redirectTo: "/usuarios/listado", pathMatch: "full" },
//  { path: "agregarPalabra", component: AltaPalabraComponent },
  { path: "listado", component: ListaUsuariosComponent },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRouting { }
