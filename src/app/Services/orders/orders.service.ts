import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Base/enviroment';
import { CheckoutResponse, UserData } from '../../Interfaces/checkout';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _http : HttpClient) { }

  checkoutOrders() : Observable<any>
  {
    return this._http.get<CheckoutResponse>(`${environment.baseURL}/api/checkout`);
  }

  saveUserInfo(data : UserData) : Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/checkout/save-user-data`, data);
  }

  checkPromocode(promoCode : string , total : number) : Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/checkout/check-promocode`,
    { promoCode: promoCode, totalPrice: total}
    );
  }
}
