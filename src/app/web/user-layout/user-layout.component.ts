import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../additions/navbar/navbar.component';
import { FooterComponent } from '../additions/footer/footer.component';
import { NgIf } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from '../../Services/auth/auth.service';
import { ShopNavbarComponent } from "../additions/shop-navbar/shop-navbar.component";

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [NgIf, NgxSpinnerModule, RouterOutlet, NavbarComponent, FooterComponent, ShopNavbarComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent implements OnInit {
  title = 'Zhome';

  @ViewChild('footer') footerComponent!: FooterComponent;

  constructor(private router: Router , private _AuthService : AuthService) {}

    ngOnInit(): void {

      this._AuthService.getSessionId();

    }

    toggleFooterSearchPopup() {
      this.footerComponent.toggleSearchPopup();
    }


    isAuthPage(): boolean {
      const authRoutes = ['/login', '/register' , '/forgetPassword']; // navbar/footer should not appear
      return authRoutes.includes(this.router.url);
    }

    isShopPage(): boolean {

      const shopRoutes = ['/shop', '/products', '/categories' , '/brands' , '/platforms' , '/cart', '/checkout' , '/product'];

      const currentUrl = this.router.url;

      if (shopRoutes.some(route => currentUrl.startsWith(route))) {
        return true;
      }

      if (currentUrl.startsWith('/product/')) {
        return true;
      }

      return false;
    }

}
