import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let CanActivateNotification = class CanActivateNotification {
    constructor(router) {
        this.router = router;
    }
    canActivate() {
        if (localStorage.role == 'Admin' || localStorage.role == 'Controller') {
            return true;
        }
        else {
            this.router.navigateByUrl('/home');
            return false;
        }
    }
};
CanActivateNotification = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Router])
], CanActivateNotification);
export { CanActivateNotification };
//# sourceMappingURL=notification-guard.js.map