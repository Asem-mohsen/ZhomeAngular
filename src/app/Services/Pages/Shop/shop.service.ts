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

  getShopFilterPage() : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/shop/shop`)
  }

  getCategoryFilterPage(id : number) : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/shop/shop/category/${id}`)
  }

  getSubcategoryFilterPage(id : number) : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/shop/shop/subcategory/${id}`)
  }

  getBrandFilterPage(id : number) : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/shop/shop/brand/${id}`)
  }

  getPlatformFilterPage(id : number) : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/shop/shop/platform/${id}`)
  }
}
