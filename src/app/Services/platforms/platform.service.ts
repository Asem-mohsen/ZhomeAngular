import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private _http: HttpClient) { }

  getPlatfroms() : Observable<any>
  {
    return this._http.get('http://127.0.0.1:8000/api/platforms')
  }

  getPlatfromsUserShow() : Observable<any>
  {
    return this._http.get('http://127.0.0.1:8000/api/platforms/userShow')
  }
}
