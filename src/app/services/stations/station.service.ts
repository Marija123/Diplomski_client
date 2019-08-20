import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StationModel } from 'src/app/model/stationModel';

//private http: Http,
interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class StationService {
  //base_url = "http://localhost:52295"
  private token: string;
  constructor( private httpClient:HttpClient, private router: Router) { }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get', type: 'addStation'|'register'|'profile', user?: StationModel): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
    } else {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
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


  public addStation(stat: StationModel): Observable<any> {
    return this.request('post', 'addStation', stat);
  }

  // addStation(station): Observable<any>{
    
  //   return this.httpClient.post(this.base_url+"/api/Stations/Add",station);
  // }
  // changeStation(station): Observable<any>{
    
  //   return this.httpClient.post(this.base_url+"/api/Stations/Change",station);
  // }

  // deleteStation(id){
    
  //   return this.httpClient.delete(this.base_url+"/api/Stations/Delete?id=" + id);
  // }

  // getAllStations() {
  //   return this.httpClient.get(this.base_url+"/api/Stations/GetStations");
  // }

}
