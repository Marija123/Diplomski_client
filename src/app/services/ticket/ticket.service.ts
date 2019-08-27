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

  private request(method: 'post'|'get', type: 'checkValidity'|'getAllTicketTypes'|'getTypeUser'| 'buyTicket', user?: FormData, stId?: String): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
    } else if(method === 'get') {
      if(type === 'getTypeUser')
      {
        base = this.httpClient.get(`/api/${type}/`+ stId, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      }else {

      
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

  public buyTicket(sve : FormData) : Observable<any> {
    return this.request('post', 'buyTicket', sve);
  }
  // public addStation(stat: StationModel): Observable<any> {
  //   return this.request('post', 'addStation', stat);
  // }

  // public changeStation(stat: StationModel) : Observable<any>{
  //   return this.request('post', 'changeStation', stat);
  // }

  // public deleteStation(stId: String) : Observable<any>{
  //   return this.request('delete', 'removeStation',null ,stId);   
  // }

}
