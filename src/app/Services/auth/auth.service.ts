import { HttpClient } from '@angular/common/http';
import { Injectable , afterNextRender } from '@angular/core';
import { Login, Register } from '../../Interfaces/auth/register';
import { environment } from '../../Base/enviroment';
import { BehaviorSubject, Observable , tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Admin, User, AuthResponse } from '../../Interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserDate: BehaviorSubject<Admin | User | null> = new BehaviorSubject<Admin | User | null>(null);

  constructor(private _http: HttpClient, private _router: Router) {

    this.loadCurrentUser();

    afterNextRender(() => {
      if (localStorage.getItem('userToken') != null) {

        this.loadCurrentUser();
        this._router.navigate([localStorage.getItem('currentPage')])
      }
    })

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
    const token = localStorage.getItem('userToken');
    if (token) {
      // Make the logout API call with the Authorization header
      this._http.post(`${environment.baseURL}/api/logout/all`, {}, {
        headers: {
           'Authorization': `Bearer ${token}`
        }
      }).subscribe({
        next: () => {
          // Clear the token and any other user data
          this.clearUserData()

          // Redirect to login page
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

  private loadCurrentUser() {
    const storedUserData = localStorage.getItem('currentUserData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.currentUserDate.next(userData);
    } else {
      this.currentUserDate.next(null);
    }
  }

  getCurrentUser(): User | Admin | null {
    return this.currentUserDate.getValue();
  }

  // Method to set user data during login
  setUserData(data: User | Admin) {
    localStorage.setItem('currentUserData', JSON.stringify(data));
    this.currentUserDate.next(data);
  }

  private clearUserData() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUserData');
    this.currentUserDate.next(null);
  }

}
