import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../../Interfaces/auth/register';
import { environment } from '../../Base/enviroment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(private _http : HttpClient) { }

  sendRegister(data : Register): Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/register` , data)
  }
}
