import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
let MenubarComponent = class MenubarComponent {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    ngOnInit() {
    }
    // loggedIn():string{
    //   if(localStorage.jwt){
    // }
    //   return localStorage.jwt;
    // }
    logout() {
        this.auth.logout();
        this.prom = "";
        this.router.navigate(["login"]);
    }
    get user() {
        return localStorage.getItem('role');
    }
};
MenubarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menubar',
        templateUrl: './menubar.component.html',
        styleUrls: ['./menubar.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Router, AuthenticationService])
], MenubarComponent);
export { MenubarComponent };
//# sourceMappingURL=menubar.component.js.map