import { Component, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import { Router, RouterLink, RouterLinkActive , NavigationEnd } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { CartService } from '../../../Services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../Interfaces/category';
import { Brand } from '../../../Interfaces/brand';
import { Platform } from '../../../Interfaces/platform';
import { NavDataService } from '../../../Services/nav-data/nav-data.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shop-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule , CommonModule , FormsModule , NgbCollapseModule],
  templateUrl: './shop-navbar.component.html',
  styleUrl: './shop-navbar.component.css',

})
export class ShopNavbarComponent {

  isMenuCollapsed : boolean = true;
  isLoggedIn: boolean = false;
  cartCount: number = 0;
  categories: Category[] = [];
  brands: Brand[] = [];
  platforms: Platform[] = [];
  showCategories = false;
  showBrands = false;
  showPlatforms = false;

  @Output() searchIconClicked = new EventEmitter<void>();

  constructor(private _AuthService: AuthService ,
              private _navData: NavDataService ,
              private _cartService : CartService ,
              private _router : Router ,
              private eRef: ElementRef,
               @Inject(PLATFORM_ID) private platformId: Object
            ) { }


  ngOnInit(): void {
    this.isLoggedIn = this._AuthService.isAuthenticated();

    if (isPlatformBrowser(this.platformId)) {

      this._cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      });

      this.loadNavData();

      this._cartService.getCartCount().subscribe();

    }

  }

  loadNavData(): void {
    this._navData.getNavData().subscribe({
      next : (res) => {
        this.categories = res.data.navbar_data.categories.slice(0, 10);
        this.brands = res.data.navbar_data.brands.slice(0, 11);
        this.platforms = res.data.navbar_data.platforms;
      }
    });
  }

  logout() {
    this._AuthService.signOutAllSessions()
  }

  openSearch() {
    this.searchIconClicked.emit();
  }

}

