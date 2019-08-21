import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let UserNotSignedInGuard = class UserNotSignedInGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate() {
        if (localStorage.jwt) {
            this.router.navigateByUrl('/home');
            return false;
        }
        return true;
    }
};
UserNotSignedInGuard = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Router])
], UserNotSignedInGuard);
export { UserNotSignedInGuard };
//# sourceMappingURL=notSignedIn-guard.js.map