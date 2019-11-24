import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChatComponent} from './componentes/chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LibsbootstrapModule } from './libsbootstrap/libsbootstrap.module';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './servicios/user.service';
import { PaginaInicioComponent } from './componentes/pagina-inicio/pagina-inicio.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundPageComponent,
    PaginaInicioComponent,
    ChatComponent
  ],

  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LibsbootstrapModule,
    NgbModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  exports: [NgbModule,ChatComponent]
})
export class AppModule { }
