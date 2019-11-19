import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicioComponent } from './componentes/pagina-inicio/pagina-inicio.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PrivadoPageComponent } from './componentes/privado-page/privado-page.component';
import { LibsbootstrapModule } from './libsbootstrap/libsbootstrap.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './servicios/user.service';
import { ModalComponent } from './componentes/modal/modal.component';



@NgModule({
  declarations: [
    AppComponent,
    PaginaInicioComponent,
    NavbarComponent,
    PrivadoPageComponent,
    NotFoundPageComponent,
  


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
  exports: [NgbModule]
})
export class AppModule { }
