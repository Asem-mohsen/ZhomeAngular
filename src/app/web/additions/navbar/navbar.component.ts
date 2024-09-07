import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { CartService } from '../../../Services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements  OnInit {

  isLoggedIn: boolean = false;

  constructor(private _AuthService: AuthService , private _cartService : CartService) { }

  cartCount: number = 0;

  ngOnInit(): void {
    this.isLoggedIn = this._AuthService.isAuthenticated();

    this._cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Initial fetch
    this._cartService.getCartCount().subscribe();

  }
  
  logout() {
    this._AuthService.signOutAllSessions()
  }
}
