import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Base/enviroment';
import { Tool } from '../../../Interfaces/tool';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient) { }

  getPlatforms() : Observable <any>
  {
    return this.http.get(`${environment.baseURL}/api/tools/proposal`)
  }

  storeData(data : Tool) : Observable <any>
  {
    return this.http.post(`${environment.baseURL}/api/tools/store` , data)

  }
}
