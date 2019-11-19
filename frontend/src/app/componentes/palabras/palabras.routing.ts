import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import{ListadoPalabrasComponent}from './listado-palabras/listado-palabras.component';
const routes: Routes = [
  { path: "", redirectTo: "/palabras/listarPalabras", pathMatch: "full" },

  { path: "listarPalabras", component: ListadoPalabrasComponent },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PalabrasRouting { }
