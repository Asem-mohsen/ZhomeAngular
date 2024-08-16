import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable, afterNextRender } from '@angular/core';
import { environment } from '../../../Base/enviroment';
import { BehaviorSubject, Observable , tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  getAdmins(): Observable<any>
  {
    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this._http.get(`${environment.baseURL}/api/admins/`, { headers });

  }

}
