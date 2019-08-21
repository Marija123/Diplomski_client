import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let UserSignedInGuard = class UserSignedInGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate() {
        if (!localStorage.getItem('mean-token')) {
            this.router.navigateByUrl('/home');
            return false;
        }
        return true;
    }
};
UserSignedInGuard = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Router])
], UserSignedInGuard);
export { UserSignedInGuard };
//# sourceMappingURL=userSignedIn-guar.js.map