import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private token: string;
  constructor( private httpClient:HttpClient, private router: Router) { }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get', type: 'validateTicketNoUser'|'checkValidity'|'getAllTicketTypes'|'getTypeUser'| 'buyTicket'| 'getAllTicketsForOneUser' | 'getPrice'| 'getTicket' | 'validateTicket', user?: FormData, stId?: any, noviPar?: any): Observable<any> {
    let base;

    if (method === 'post') {
      if(type === 'validateTicketNoUser')
      {
        base = this.httpClient.post(`/api/${type}`, stId);
      }else if( type === 'validateTicket'){
        base = this.httpClient.post(`/api/${type}/` + stId, noviPar);
      
      }else{
        base = this.httpClient.post(`/api/${type}`, user);
      }
      
    } else if(method === 'get') {
      if(type === 'getTypeUser' || type === 'getAllTicketsForOneUser' || type==='getTicket')
      {
        base = this.httpClient.get(`/api/${type}/`+ stId, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      
      }else if(type === "getPrice" ) {
        base = this.httpClient.get(`/api/${type}`,{ headers: { Authorization: `Bearer ${this.getToken()}` }, params: {parami : stId, par:  noviPar}});
      }
      else{

      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      }
    }
    else {
      base= this.httpClient.delete(`/api/${type}/`+ stId);
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
  public getAllTicketTypes(): Observable<any> {
    return this.request('get', 'getAllTicketTypes');
  }
  public checkValidity(aa : FormData) : Observable<any> {
    return this.request('post', 'checkValidity', aa);
  }

  public getTypeUser(email: String):Observable<any> {
    return this.request('get', 'getTypeUser',null,  email);

  }

  public validateTicket(param, aa):Observable<any> {
    return this.request('post', 'validateTicket',null, param ,aa );

  }

  public getPrice(param, aa):Observable<any> {
    return this.request('get', 'getPrice',null, param ,aa );

  }

  public getAllTicketsForOneUser(email: String): Observable<any> {
    return this.request('get','getAllTicketsForOneUser',null, email)
  }
  public getTicket(email: any): Observable<any> {
    return this.request('get','getTicket',null, email);
  }

  public buyTicket(sve : FormData) : Observable<any> {
    return this.request('post', 'buyTicket', sve);
  }
public validateTicketNoUser(tick :any)  : Observable<any> {
  return this.request('post', 'validateTicketNoUser',null, tick);
}

}
