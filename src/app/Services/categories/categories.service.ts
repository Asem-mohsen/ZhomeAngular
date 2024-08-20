import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http : HttpClient) { }

  getCategories() :Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/category/user/categories`);
  }
}
