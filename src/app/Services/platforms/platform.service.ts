import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private _http: HttpClient) { }

  getPlatfroms() : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/platforms`)
  }

}
