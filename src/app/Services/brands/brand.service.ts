import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _http : HttpClient) { }

  getBrands() :Observable<any>
  {
    return this._http.get('http://127.0.0.1:8000/api/brands');
  }
}
