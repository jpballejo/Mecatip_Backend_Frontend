import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular//common/http';
import { UsuariosRouting } from './usuarios.routing';
@NgModule({
  declarations: [ListaUsuariosComponent],
  imports: [
    CommonModule, FormsModule, HttpClientModule, UsuariosRouting
  ],
  exports: [ListaUsuariosComponent]
})
export class UsuariosModule { }
