import { Component, EventEmitter, Inject, OnInit , Output, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { CartService } from '../../../Services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule , CommonModule , FormsModule , NgbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements  OnInit {

  isMenuCollapsed : boolean = true;
  isLoggedIn: boolean = false;
  cartCount: number = 0;

  @Output() searchIconClicked = new EventEmitter<void>();

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

  constructor(private _AuthService: AuthService , private _cartService : CartService  ,@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.isLoggedIn = this._AuthService.isAuthenticated();

    if (isPlatformBrowser(this.platformId)) {

      this._cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      });

      this._cartService.getCartCount().subscribe();
    }

  }

  logout() {
    this._AuthService.signOutAllSessions()
  }

  openSearch() {
    this.searchIconClicked.emit();
  }

}
