import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
// export interface TokenPayload {
//   email: string;
//   password: string;
//   name?: string;
//   surname?: string;
//   address?: string;
//   birthday?: Date;
//   image?: string;
//   activated?: string;
//   role?: string;
// }
let AuthenticationService = class AuthenticationService {
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
    getUserDetails() {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }
        else {
            return null;
        }
    }
    isLoggedIn() {
        const user = this.getUserDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    }
    request(method, type, user) {
        let base;
        if (method === 'post') {
            base = this.http.post(`/api/${type}`, user);
        }
        else {
            base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
        }
        const request = base.pipe(map((data) => {
            if (data.token) {
                if (type === 'login') {
                    this.saveToken(data.token);
                }
            }
            return data;
        }));
        return request;
    }
    register(user) {
        return this.request('post', 'register', user);
    }
    login(user) {
        return this.request('post', 'login', user);
    }
    profile() {
        return this.request('get', 'profile');
    }
    logout() {
        this.token = '';
        window.localStorage.removeItem('mean-token');
        // localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        this.router.navigateByUrl('/');
    }
};
AuthenticationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map