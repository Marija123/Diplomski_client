import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
//import { AuthenticationService } from '../services/auth/authentication.service';
let TokenInterceptor = class TokenInterceptor {
    constructor() { }
    intercept(req, next) {
        //throw new Error("Method not implemented.");
        let jwt = localStorage.jwt;
        console.log(req);
        if (jwt) {
            req = req.clone({
                setHeaders: {
                    "Authorization": "Bearer " + jwt
                }
            });
        }
        return next.handle(req);
    }
};
TokenInterceptor = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], TokenInterceptor);
export { TokenInterceptor };
//public auth: AuthenticationService
//# sourceMappingURL=token.interceptor.js.map