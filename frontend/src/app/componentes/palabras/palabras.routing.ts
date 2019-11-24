import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPalabrasComponent } from './listado-palabras/listado-palabras.component';
const routes: Routes = [
  { path: "", redirectTo: "listado", pathMatch: "full" },
  { path: "listado", component: ListadoPalabrasComponent },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PalabrasRouting { }
