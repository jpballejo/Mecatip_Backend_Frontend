import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRouting } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from '../../servicios/auth.service';
@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule, FormsModule, HttpClientModule, AuthRouting
  ],
  exports: [LoginComponent, SignupComponent],
  providers: [AuthService]
})
export class AuthModule { }
