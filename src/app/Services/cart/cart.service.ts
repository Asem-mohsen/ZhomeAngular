import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable , signal, computed } from '@angular/core';
import { environment } from '../../Base/enviroment';
import { ApiResponse, CartItem } from '../../Interfaces/cart';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);
  
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private _http : HttpClient) {}

  getCart(): Observable<any> {
    return this._http.get(`${environment.baseURL}/api/cart`);
  }

  storeCart(productId : number , quantity?: number) :  Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/cart/add` ,
    { product_id: productId, quantity: quantity || 1 }
    ).pipe(
      tap(() => this.getCartCount().subscribe())
    );
  }


  updateQuantity(productId : number , quantity : number) :  Observable<any>
  {
    return this._http.post<ApiResponse>(`${environment.baseURL}/api/cart/updateQuantity` ,
    { product_id: productId, quantity });
  }

  updateInstalltion(productId : number , installationCost : number) :  Observable<any>
  {
    return this._http.post<ApiResponse>(`${environment.baseURL}/api/cart/update-Installtion` ,
    { product_id: productId, installation_cost: installationCost });
  }

  removeItem(productId: number): Observable<any> {
    return this._http.delete(`${environment.baseURL}/api/cart/remove/${productId}`).pipe(
      tap(() => this.getCartCount().subscribe())
    );
  }

  removeAll(): Observable<any> {
    return this._http.delete(`${environment.baseURL}/api/cart/clearCart`).pipe(
      tap(() => this.getCartCount().subscribe())
    );
  }


  checkout(): Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/checkout/`);
  }

  getCartCount(): Observable<any> {
    return this._http.get(`${environment.baseURL}/api/cart/count`).pipe(
      tap((res: any) => this.cartCountSubject.next(res.data.count))
    );
  }


}
