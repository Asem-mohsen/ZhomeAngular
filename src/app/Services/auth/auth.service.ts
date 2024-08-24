import { HttpClient } from '@angular/common/http';
import { Inject, Injectable , PLATFORM_ID, afterNextRender } from '@angular/core';
import { Login, Register } from '../../Interfaces/auth/register';
import { environment } from '../../Base/enviroment';
import { BehaviorSubject, Observable , tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Admin, User, AuthResponse } from '../../Interfaces/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';

  currentUserDate: BehaviorSubject<Admin | User | null> = new BehaviorSubject<Admin | User | null>(null);
  constructor(private _http: HttpClient, private _router: Router, @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId) && this.getToken()) {
      this._router.navigate([localStorage.getItem('currentPage') || '/']);
    }

  }

  sendRegister(data : Register): Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/register` , data)
  }

  sendLogin(loginData : Login): Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/login` , loginData)
  }

  signOutCurrent()
  {

  }

  signOutOthers()
  {

  }

  signOutAllSessions() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.tokenKey);
      if (token) {
        this._http.post(`${environment.baseURL}/api/logout/all`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).subscribe({
          next: () => {
            this.clearUserData();
            this._router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Logout failed', err);
          }
        });
      } else {
        console.error('No token found, unable to logout');
      }
    }
  }

  getCurrentUser(): User | Admin | null {
    return this.currentUserDate.getValue();
  }

  private clearUserData() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.currentUserDate.next(null);
    }
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(this.tokenKey) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

}
