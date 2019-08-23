import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketPricesPomModel } from 'src/app/model/ticketPricesPomModel';
import { HttpClient } from '@angular/common/http';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class PricelistService {
  private token: string;

  constructor(private httpClient:HttpClient) { }
  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }


  private request(method: 'post'|'get', type: 'addPricelist'|'getPricelist', user?: TicketPricesPomModel): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
    } else if(method === 'get') {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    // else {
    //   base= this.httpClient.delete(`/api/${type}/`+ stId);
    // }

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
  public getPricelist(): Observable<any> {
    return this.request('get', 'getPricelist');
  }

  public addPricelist(vehic: TicketPricesPomModel): Observable<any> {
    return this.request('post', 'addPricelist', vehic);
  }

  // public getAllAvailableVehicles() : Observable<any>{
  //   return this.request('get', 'getAllAvailableVehicles');
  // }

  // public deleteVehicle(vId: String) : Observable<any>{
  //   return this.request('delete', 'removeVehicle',null ,vId);   
  // }


}
