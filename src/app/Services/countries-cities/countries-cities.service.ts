import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesCitiesService {

  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '7a31cb7180mshdbbd2b3bf0fe1dep1d5e40jsn593b2192d757',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  });

  // Fetch all countries with flags
  getCountries(): Observable<any> {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  // Fetch cities based on country ISO code
  getCities(countryCode: string): Observable<any> {
    return this.http.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions`, { headers: this.headers });
  }
}
