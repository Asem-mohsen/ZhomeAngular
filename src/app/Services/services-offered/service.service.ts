import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }

  getServices(): Observable<any>
  {
    return this.http.get(`${environment.baseURL}/api/services`);
  }
}
