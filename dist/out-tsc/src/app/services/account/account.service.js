import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
let AccountService = class AccountService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
    }
    saveToken(token) {
        localStorage.setItem('mean-token', token);
        this.token = token;
    }
    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }
    request(method, type) {
        let base;
        return base = this.http.get(`/api/${type}`).pipe();
        // const request = base.pipe(
        //   map((data: TokenResponse) => {
        //     if (data.token) {
        //       this.saveToken(data.token);
        //     }
        //     return data;
        //   })
        // );
        // return request;
    }
    getPassengerTypes() {
        return this.request('get', 'getPassengerTypes');
    }
};
AccountService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
], AccountService);
export { AccountService };
//# sourceMappingURL=account.service.js.map