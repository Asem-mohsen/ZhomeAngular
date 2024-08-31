import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { CartService } from '../../../Services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements  OnInit {

  isLoggedIn: boolean = false;

  constructor(private _AuthService: AuthService , private _cartService : CartService) { }

  cartCount = this._cartService.cartCount
  ngOnInit(): void {
    this.isLoggedIn = this._AuthService.isAuthenticated();
  }

  logout() {
    this._AuthService.signOutAllSessions()
  }
}
