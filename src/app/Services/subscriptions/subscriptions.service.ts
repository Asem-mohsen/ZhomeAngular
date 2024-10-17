import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private _http : HttpClient) { }

  subscription(email : string) : Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/subscribers/newSubscriber` , email);
  }

}
