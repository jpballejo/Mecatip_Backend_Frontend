import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicioComponent } from 'src/app/componentes/pagina-inicio/pagina-inicio.component';
import { NotFoundPageComponent } from 'src/app/componentes/not-found-page/not-found-page.component';
//import { ChatComponent } from 'src/app/componentes/chat/chat.component';



const routes: Routes = [
  { path: "", redirectTo: "/inicio", pathMatch: "full" },
  { path: "inicio", component: PaginaInicioComponent },
  { path: "auth", loadChildren: './componentes/auth/auth.module#AuthModule' },
  { path: "palabras", loadChildren: './componentes/palabras/palabras.module#PalabrasModule' },
  { path: "usuarios", loadChildren: './componentes/usuarios/usuarios.module#UsuariosModule' },
//  { path: "chat", component: ChatComponent },
  { path: "juego", loadChildren:'./componentes/juego/juego.module#JuegoModule' },
  { path: "**", component: NotFoundPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
