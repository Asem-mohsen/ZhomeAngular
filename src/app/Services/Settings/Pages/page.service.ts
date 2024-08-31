import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private readonly currentPageKey = 'currentPage';
  private readonly adminPageKey = 'adminCurrentPage';
  private readonly userPageKey = 'userCurrentPage';
  constructor() {}

  setCurrentPage(page: string, isAdmin: boolean): void {
    if (typeof localStorage !== 'undefined') {
      const key = isAdmin ? this.adminPageKey : this.userPageKey;
      localStorage.setItem(key, page);
    }
  }

  getCurrentPage(isAdmin: boolean): string | null {
    const key = isAdmin ? this.adminPageKey : this.userPageKey;
    return localStorage.getItem(key);
  }
}
