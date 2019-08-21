import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
let LoginComponent = class LoginComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
        this.credentials = {
            email: '',
            password: ''
        };
    }
    ngOnInit() {
    }
    login() {
        this.auth.login(this.credentials).subscribe(() => {
            this.router.navigateByUrl('/profile');
        }, (err) => {
            console.error(err);
        });
    }
    onSignIn(loginData, form) {
        //if(this.validations.validate(loginData)) return;
        this.credentials.email = loginData.Email;
        this.credentials.password = loginData.Password;
        this.auth.login(this.credentials).subscribe(res => {
            this.auth.profile().subscribe(data => {
                let user = data;
                localStorage.setItem('role', user.role);
                localStorage.setItem('name', user.email);
            });
            // console.log(res.access_token);
            // let jwt = res.access_token;
            // let jwtData = jwt.split('.')[1]
            // let decodedJwtJasonData = window.atob(jwtData)
            // let decodetJwtData = JSON.parse(decodedJwtJasonData)
            // let rola = decodetJwtData.role
            // // console.log('jwtData: ' + jwtData)
            // // console.log('decodedJwtJsonData: ' + decodedJwtJasonData)
            // // console.log(decodetJwtData)
            // console.log('Role: ' + rola)
            // let a = decodetJwtData.unique_name
            // localStorage.setItem('jwt', jwt)
            // localStorage.setItem('role', rola)
            // console.log("iz storagea");
            // console.log(localStorage.getItem('role'))
            // localStorage.setItem('name',a);
            // //window.location.href = "/home"
            this.router.navigateByUrl('/home');
        }, error => {
            console.log(error);
            alert("Wrong username or password");
        });
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, Router])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map