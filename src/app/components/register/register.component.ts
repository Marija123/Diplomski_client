import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    surname: '',
    address: '',
    birthday: new Date(),
    image: '',
    activated: '',
    role: ''
  };
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

}
