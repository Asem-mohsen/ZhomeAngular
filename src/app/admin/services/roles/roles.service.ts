import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Base/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _http : HttpClient) { }

  getRoles() : Observable<any>
  {
    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this._http.get(`${environment.baseURL}/api/roles` , { headers })
  }
}
