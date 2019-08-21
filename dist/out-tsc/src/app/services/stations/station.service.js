import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
let StationService = class StationService {
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
    getAllStations() {
        return this.request('get', 'getAllStations');
    }
    addStation(stat) {
        return this.request('post', 'addStation', stat);
    }
    changeStation(stat) {
        return this.request('post', 'changeStation', stat);
    }
    deleteStation(stId) {
        return this.request('delete', 'removeStation', null, stId);
    }
};
StationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
], StationService);
export { StationService };
//# sourceMappingURL=station.service.js.map