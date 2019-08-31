import { Component, OnInit } from '@angular/core';
import {  AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { TokenPayload } from 'src/app/model/tokenPayload';
import { RegModel } from 'src/app/model/regModel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }


  onSignIn(loginData: RegModel, form:NgForm){

    let fd = new FormData();
    fd.append('email', loginData.Email);
    fd.append('password', loginData.Password);
    this.auth.login(fd).subscribe(
      res => {

        this.auth.profile().subscribe(data => {
         
          let user = data;
          localStorage.setItem('role', user.role);
          localStorage.setItem('name', user.email);
        });

   
        this.router.navigateByUrl('/home');
        
      },
      error => {
        console.log(error)
        alert("Wrong username or password");
        
      }
    );
    
  }
  
}

