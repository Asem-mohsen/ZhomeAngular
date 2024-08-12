import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./web/additions/navbar/navbar.component";
import { FooterComponent } from "./web/additions/footer/footer.component";
import { HomeComponent } from './web/layout/home/home.component';
import { ContactComponent } from './web/layout/contact/contact.component';
import { AboutComponent } from './web/layout/about/about.component';
import { BrandComponent } from './web/layout/brand/brand.component';
import { CartComponent } from './web/layout/cart/cart.component';
import { CategoryComponent } from './web/layout/category/category.component';
import { LoginComponent } from './web/auth/login/login.component';
import { RegisterComponent } from './web/auth/register/register.component';
import { CheckoutComponent } from './web/layout/checkout/checkout.component';
import { PlatformComponent } from './web/layout/platform/platform.component';
import { ProfileComponent } from './web/layout/profile/profile.component';
import { ProductComponent } from './web/layout/product/product.component';
import { ServiceComponent } from './web/layout/service/service.component';
import { ToolComponent } from './web/layout/tool/tool.component';
import { ShopComponent } from './web/layout/shop/shop.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf , RouterOutlet, NavbarComponent, FooterComponent , HomeComponent , ContactComponent , ShopComponent , AboutComponent , BrandComponent , CartComponent , CategoryComponent , LoginComponent , RegisterComponent , CheckoutComponent , PlatformComponent , ProfileComponent , ProductComponent , ServiceComponent, ToolComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Zhome';

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    const authRoutes = ['/login', '/register']; // Define the routes where navbar/footer should not appear
    return authRoutes.includes(this.router.url);
  }

}
