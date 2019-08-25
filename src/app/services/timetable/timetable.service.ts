import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimetableModel } from 'src/app/model/timetableModel';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private token: string;
  constructor(private httpClient:HttpClient) { }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get'|'delete', type: 'addTimetable'|'getAllTimetables'|'deleteTimetable'|'getAllDayTypes'|'changeTimetable', user?: TimetableModel, stId?: String): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
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
  public getAllTimetables(): Observable<any> {
    return this.request('get', 'getAllTimetables');
  }

  public addTimetable(vehic: TimetableModel): Observable<any> {
    return this.request('post', 'addTimetable', vehic);
  }

  public getAllDayTypes() : Observable<any>{
    return this.request('get', 'getAllDayTypes');
  }

  public deleteTimetable(vId: String) : Observable<any>{
    return this.request('delete', 'deleteTimetable',null ,vId);   
  }

  public changeTimetable(vehic: TimetableModel): Observable<any> {
    return this.request('post', 'changeTimetable', vehic);
  }
}