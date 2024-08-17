import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private readonly currentPageKey = 'currentPage';

  constructor() {}

  setCurrentPage(page: string): void {
    if(typeof localStorage != 'undefined'){
      localStorage.setItem(this.currentPageKey, page);
    }
    
  }

  getCurrentPage(): string | null {
      return localStorage.getItem(this.currentPageKey);
  }
  
}
