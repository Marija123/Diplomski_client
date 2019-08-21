import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let CanActivateViaAuthGuard = class CanActivateViaAuthGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate() {
        if (localStorage.role == 'Admin') {
            return true;
        }
        else {
            this.router.navigateByUrl('/home');
            return false;
        }
    }
};
CanActivateViaAuthGuard = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Router])
], CanActivateViaAuthGuard);
export { CanActivateViaAuthGuard };
//# sourceMappingURL=auth-guard.js.map