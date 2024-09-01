import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable , signal, computed } from '@angular/core';
import { environment } from '../../Base/enviroment';
import { ApiResponse, CartItem } from '../../Interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);
  cartCount = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + Number(item.Quantity), 0);
  });

  constructor(private _http : HttpClient) { }

  getCart(): Observable<any> {
    return this._http.get(`${environment.baseURL}/api/cart`);
  }

  storeCart(productId : number , quantity?: number) :  Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/cart/add` ,
    { product_id: productId, quantity: quantity || 1 }
    );
  }


  updateQuantity(productId : number , quantity : number , installationCost?: number) :  Observable<any>
  {
    return this._http.post<ApiResponse>(`${environment.baseURL}/api/cart/updateQuantity` ,
    { product_id: productId, quantity  , installation_cost : installationCost || 0 });
  }

  removeItem(productId: number): Observable<any> {
    return this._http.delete(`${environment.baseURL}/api/cart/remove/${productId}`);
  }

  removeAll(): Observable<any> {
    return this._http.delete(`${environment.baseURL}/api/cart/clearCart`);
  }


  checkout(): Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/checkout/`);
  }

}
