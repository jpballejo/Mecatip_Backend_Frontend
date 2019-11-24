import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular//common/http';
import { UsuariosRouting } from './usuarios.routing';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ListaUsuariosComponent, PerfilComponent],
  imports: [
    CommonModule, FormsModule, HttpClientModule, UsuariosRouting,ReactiveFormsModule
  ],
  exports: [ListaUsuariosComponent,PerfilComponent]
})
export class UsuariosModule { }
