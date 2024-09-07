import { HttpClient } from '@angular/common/http';
import { Inject, Injectable , PLATFORM_ID, afterNextRender } from '@angular/core';
import { Login, Register } from '../../Interfaces/auth/register';
import { environment } from '../../Base/enviroment';
import { BehaviorSubject, Observable , tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Admin, User, AuthResponse, profileResponse } from '../../Interfaces/user';
import { isPlatformBrowser } from '@angular/common';
import { ApiResponse } from '../../Interfaces/cart';

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
        this._http.post(`${environment.baseURL}/api/logout/all` , {}).subscribe({
          next: () => {
            this.clearUserData();
            this._router.navigate(['/login']);
          }
        });
      } else {
        console.error('No token found, unable to logout');
      }
    }
  }

  getUserProfile() : Observable<any>
  {
    return this._http.get(`${environment.baseURL}/api/users/profile/user`);
  }

  updateUserProfile(data : User) : Observable<any>
  {
    return this._http.put(`${environment.baseURL}/api/users/update` , data);
  }

  deleteUserProfile() : Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/users/delete` , []);
  }

  deactivateUserProfile() : Observable<any>
  {
    return this._http.post(`${environment.baseURL}/api/users/deactivate` , []);
  }

  getCurrentUser(): User | Admin | null {
    return this.currentUserDate.getValue();
  }

  private clearUserData() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('sessionId');
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

  // Sessions
  getSessionId(): string {
    // Check if 'window' and 'localStorage' are available
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = this.generateSessionId();
        localStorage.setItem('sessionId', sessionId);
      }
      return sessionId;
    } else {
      return '';
    }
  }

  generateSessionId(): string {
    return 'guest-' + Math.random().toString(36).substring(2, 15);
  }

}
