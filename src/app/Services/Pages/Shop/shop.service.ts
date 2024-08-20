import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Base/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private _http : HttpClient) { }

  getShopPage() : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/shop`)
  }
}
