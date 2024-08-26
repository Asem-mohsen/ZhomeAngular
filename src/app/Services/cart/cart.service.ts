import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Base/enviroment';
import { ApiResponse } from '../../Interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http : HttpClient) { }

  private getHeaders(): HttpHeaders {
    /*
       * we store the session ID on the local storage as it's unique
       * idintifier to handle all the cart related operations adding, removing and displaying
    */
    let headers = new HttpHeaders();

    if (typeof localStorage != 'undefined') {
      const token = localStorage.getItem('authToken');
      const sessionId = this.getSessionId();

      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      if (sessionId) {
        headers = headers.set('X-Session-ID', sessionId);
      }
    }
    return headers;
  }

  getCart(): Observable<any> {
    const headers = this.getHeaders();
    return this._http.get<ApiResponse>(`${environment.baseURL}/api/cart`, {  headers: headers  });
  }

  storeCart(productId : number , quantity: number = 1) :  Observable<any>
  {
    const headers = this.getHeaders();
    return this._http.post(`${environment.baseURL}/api/cart/add` ,
    { product_id: productId, quantity: quantity },
    { headers: headers });
  }

  updateQuantity(productId : number , quantity : number) :  Observable<any>
  {
    const headers = this.getHeaders();
    return this._http.post<ApiResponse>(`${environment.baseURL}/api/cart/updateQuantity` ,
    { product_id: productId, quantity },
    { headers: headers });
  }

  removeItem(productId: number): Observable<any> {
    const headers = this.getHeaders();
    return this._http.delete(`${environment.baseURL}/api/cart/remove/${productId}`,
      {  headers: headers  }
    );
  }

  removeAll(): Observable<any> {
    const headers = this.getHeaders();
    return this._http.delete(`${environment.baseURL}/api/cart/clearCart`, {  headers: headers  });
  }

  // Sessions
  private getSessionId(): string {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private generateSessionId(): string {
    return 'guest-' + Math.random().toString(36).substring(2, 15);
  }
}
