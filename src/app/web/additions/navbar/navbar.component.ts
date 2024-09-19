import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { CartService } from '../../../Services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule , CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements  OnInit {

  isLoggedIn: boolean = false;
  cartCount: number = 0;
  currentRoute: string = '';

  constructor(private _AuthService: AuthService , private _cartService : CartService , private _router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this._AuthService.isAuthenticated();

    this._cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.currentRoute = this._router.url;

    this._cartService.getCartCount().subscribe();

    this._router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)) // Type narrowing here
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
}
