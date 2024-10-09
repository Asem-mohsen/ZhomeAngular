import { Component, ElementRef, HostListener, Inject, OnInit , PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { CartService } from '../../../Services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule , CommonModule , FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements  OnInit {

  isLoggedIn: boolean = false;
  cartCount: number = 0;
  currentRoute: string = '';
  searchQuery : string = '';
  isSearchVisible : boolean = false;

  filteredPages: any[] = [];
  pages = [
    { name: 'Home', link: '/home' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Contact', link: '/contact' },
    { name: 'Cart', link: '/cart' },
    { name: 'Checkout', link: '/checkout' },
    { name: 'Proposal', link: '/proposal' },
  ];

  constructor(private _AuthService: AuthService , private _cartService : CartService , private _router : Router , private eRef: ElementRef,  @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.isLoggedIn = this._AuthService.isAuthenticated();

    this.currentRoute = this._router.url;

    if (isPlatformBrowser(this.platformId)) {

      this._cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      });
  
      this._cartService.getCartCount().subscribe();
    }

    this._router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });

  }

  logout() {
    this._AuthService.signOutAllSessions()
  }

  isRoute(paths: string[]): boolean {
    return paths.some(path => this.currentRoute.includes(path));
  }

  toggleSearchPopup() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  closeSearchPopup() {
    this.isSearchVisible = false;
    this.searchQuery = '';
    this.filteredPages = [];
  }

  searchPages() {
    const query = this.searchQuery.toLowerCase();

    this.filteredPages = this.pages.filter(page =>
      page.name.toLowerCase().includes(query)
    );
  }

  navigateToPage(page : any) {
    this.closeSearchPopup();
    this._router.navigate([page.link]);
  }


  @HostListener('document:click', ['$event'])
  closePopupOnOutsideClick(event: Event) {
    if (this.isSearchVisible && !this.eRef.nativeElement.contains(event.target)) {
      this.closeSearchPopup();
    }
  }

  handleClose(event: MouseEvent) {
    if (event.target === document.querySelector('.search-popup')) {
      this.closeSearchPopup();
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeSearchPopup();
    }
  }

}
