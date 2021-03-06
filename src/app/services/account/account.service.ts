import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { TokenPayload } from 'src/app/model/tokenPayload';


interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private token: string;

  

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }


  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'get'| 'post', type: 'getPassengerTypes'| 'resendReqest', user? : FormData): Observable<any> {
    let base;

    if(method === "get"){
      return base = this.http.get(`/api/${type}`).pipe();
    }else {
      return base = this.http.post(`/api/${type}`, user);
    }
     
  }

  public getPassengerTypes(): Observable<any> {
    return this.request('get', 'getPassengerTypes');
  }

  public resendReqest(a : FormData) : Observable<any> {
    return this.request('post', 'resendReqest', a);
  }
}
