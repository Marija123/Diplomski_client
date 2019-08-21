import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let CanActivateUser = class CanActivateUser {
    constructor(router) {
        this.router = router;
    }
    canActivate() {
        if (localStorage.role == 'AppUser' || !localStorage.jwt) {
            return true;
        }
        else {
            this.router.navigateByUrl('/home');
            return false;
        }
    }
};
CanActivateUser = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Router])
], CanActivateUser);
export { CanActivateUser };
//# sourceMappingURL=user-guard.js.map