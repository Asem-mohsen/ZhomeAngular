import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) {}

  createPayment(amount: number): Observable<any> {
    return this.http.post(`${environment.baseURL}/api/payment/create-payment`, { amount });
  }

  createCashPayment(amount: number): Observable<any> {
    return this.http.post(`${environment.baseURL}/api/payment/cash-payment`, { amount  });
  }
}
