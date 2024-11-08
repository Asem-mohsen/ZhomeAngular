import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http :  HttpClient) { }

  getProduct() : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/products/products`);
  }

  getOneProduct(id : string | null): Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/products/${id}/show`);
  }

  getProductsCard(): Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/products/product-card`);
  }
}
