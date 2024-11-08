import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Base/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http : HttpClient) { }

  getZhomeData() : Observable<any>
  {
    return this.http.get(`${environment.baseURL}/api/contact`);
  }

  sendEmail(data : any) : Observable<any>
  {
    return this.http.post(`${environment.baseURL}/api/send-message`, data);
  }

}
