import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { PerfilComponent } from './perfil/perfil.component'
const routes: Routes = [
  { path: "", redirectTo: "perfil", pathMatch: "full" },
  { path: "perfil", component: PerfilComponent },
  { path: "listado", component: ListaUsuariosComponent },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRouting { }
