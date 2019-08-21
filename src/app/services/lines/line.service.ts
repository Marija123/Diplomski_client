import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineModel } from 'src/app/model/lineModel';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private token: string;
  constructor( private httpClient:HttpClient, private router: Router) { }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get'|'delete', type: 'addLine'|'getAllLines'|'changeLine'|'removeLine', user?: LineModel, stId?: String): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);

      if(type === 'changeLine')
      {
        base = this.httpClient.post(`/api/${type}/` + stId, user);
      }

    } else if(method === 'get') {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
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
  public getAllLines(): Observable<any> {
    return this.request('get', 'getAllLines');
  }

  public addLine(stat: LineModel): Observable<any> {
    return this.request('post', 'addLine', stat);
  }

  public changeLine(stat: LineModel,stId: String) : Observable<any>{
    return this.request('post', 'changeLine', stat, stId);
  }

  public deleteLine(stId: String) : Observable<any>{
    return this.request('delete', 'removeLine',null ,stId);   
  }


}
