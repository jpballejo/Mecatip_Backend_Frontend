import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import { UserI } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log('login');
  }
  loginUser(userForm: NgForm) {


    var username = userForm.controls['username'].value;
    var password = userForm.controls['password'].value;
    //form.value;

    var user =
    {
      "username": username,
      "password": password
    };
    this.authService.login(userForm.value).subscribe((res) => {
      if (res.token) this.router.navigateByUrl('/inicio');
      else this.router.navigateByUrl('/auth/login');
    })
    console.log(user);
  }
}
