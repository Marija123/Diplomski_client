import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let ControlorGuard = class ControlorGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate() {
        if (localStorage.role == 'Controller') {
            return true;
        }
        else {
            this.router.navigateByUrl('/home');
            return false;
        }
    }
};
ControlorGuard = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Router])
], ControlorGuard);
export { ControlorGuard };
//# sourceMappingURL=controler-guard.js.map