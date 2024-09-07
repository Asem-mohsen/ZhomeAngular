import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }

  sendVerificationCode(email: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/api/forget-password/send-code`, { email });
  }

  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/api/forget-password/verify-code`, { email, code });
  }

  resetPassword(email: string, code: string, password: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/api/forget-password/reset`, { email, code, password });
  }

}
