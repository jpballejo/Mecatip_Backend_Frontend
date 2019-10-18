import { Component } from '@angular/core';
import { UserService } from './servicios/user.service';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a MecaTIP!';
  constructor(public uAPI:UserService, public aAPI:AuthService){
    aAPI.setHeaders();
  }
}
