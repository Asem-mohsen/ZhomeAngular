import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../Base/enviroment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavDataService {

  constructor(private http: HttpClient) {}

  getNavData(): Observable<any> {
    return this.http.get(`${environment.baseURL}/api/shop/nav-data`);
  }
}
