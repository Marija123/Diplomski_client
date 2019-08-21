import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
let LineService = class LineService {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
    }
    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }
    request(method, type, user, stId) {
        let base;
        if (method === 'post') {
            base = this.httpClient.post(`/api/${type}`, user);
            if (type === 'changeLine') {
                base = this.httpClient.post(`/api/${type}/` + stId, user);
            }
        }
        else if (method === 'get') {
            base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
        }
        else {
            base = this.httpClient.delete(`/api/${type}/` + stId);
        }
        // const request = base.pipe(
        //   map((data: TokenResponse) => {
        //     if (data.token) {
        //       if( type === 'login')
        //       {
        //         this.saveToken(data.token);
        //       }
        //     }
        //     return data;
        //   })
        // );
        return base;
    }
    getAllLines() {
        return this.request('get', 'getAllLines');
    }
    addLine(stat) {
        return this.request('post', 'addLine', stat);
    }
    changeLine(stat, stId) {
        return this.request('post', 'changeLine', stat, stId);
    }
    deleteLine(stId) {
        return this.request('delete', 'removeLine', null, stId);
    }
};
LineService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
], LineService);
export { LineService };
//# sourceMappingURL=line.service.js.map