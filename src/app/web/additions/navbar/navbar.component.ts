import { Component, EventEmitter, Inject, OnInit , Output, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import { Router, RouterLink, RouterLinkActive , NavigationEnd} from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { CartService } from '../../../Services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';

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
  isBlackedNavbar = false;

  @Output() searchIconClicked = new EventEmitter<void>();

  constructor(private _AuthService: AuthService , private _cartService : CartService  ,@Inject(PLATFORM_ID) private platformId: Object , private router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this._AuthService.isAuthenticated();

    if (isPlatformBrowser(this.platformId)) {

      this._cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      });

      this._cartService.getCartCount().subscribe();

      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkForBlackNavbar(event.urlAfterRedirects);
      });
    }

  }

  checkForBlackNavbar(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    const blackNavbarRoutes = ['/tools', '/interior-design' , '/proposal' , '/services'];
    this.isBlackedNavbar = blackNavbarRoutes.includes(cleanUrl) ? true : false;
  }

  logout() {
    this._AuthService.signOutAllSessions()
  }

  openSearch() {
    this.searchIconClicked.emit();
  }

}
