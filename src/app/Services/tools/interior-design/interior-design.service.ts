import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../Base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InteriorDesignService {

  constructor(private http: HttpClient) {}

  getRoomImages(query: string): Observable<any> {
    return this.http.get<any>(`${environment.UnsplashURL}?query=${query}&client_id=${environment.UnsplashKey}`);
  }

  getFurnitureImages(query: string): Observable<any> {
    return this.http.get<any>(`${environment.UnsplashURL}?query=${query}&client_id=${environment.UnsplashKey}`);
  }

}
