import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import { UserI } from '../../../interfaces/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  registerUser(userForm: NgForm) {
    console.log(userForm.value);
    this.authService.registrarse(userForm.value).subscribe(res => { this.router.navigateByUrl('/inicio'); })
  }

}
