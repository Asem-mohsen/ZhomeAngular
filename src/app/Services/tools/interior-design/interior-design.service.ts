import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InteriorDesignService {

  private apiUrl = 'https://api.unsplash.com/search/photos'; // Example API
  private apiKey = '2oEZKkD-vva609bEUwoauMVttUbsLoDHKDWT009om7A'; // Replace with your API key

  constructor(private http: HttpClient) {}

  // getRoomImages(query: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}?query=${query}&client_id=${this.apiKey}`);
  // }

  getRoomImages(query: string): Observable<any> {
    const url = `${this.apiUrl}?query=${query}&client_id=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching images:', error);
        throw error; // Re-throw the error after logging it
      })
    );
  }
}
