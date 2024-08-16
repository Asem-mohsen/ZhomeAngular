import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../additions/navbar/navbar.component';
import { FooterComponent } from '../additions/footer/footer.component';
import { HomeComponent } from '../layout/home/home.component';
import { ContactComponent } from '../layout/contact/contact.component';
import { AboutComponent } from '../layout/about/about.component';
import { BrandComponent } from '../layout/brand/brand.component';
import { CartComponent } from '../layout/cart/cart.component';
import { CategoryComponent } from '../layout/category/category.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { CheckoutComponent } from '../layout/checkout/checkout.component';
import { PlatformComponent } from '../layout/platform/platform.component';
import { ProfileComponent } from '../layout/profile/profile.component';
import { ProductComponent } from '../layout/product/product.component';
import { ServiceComponent } from '../layout/service/service.component';
import { ToolComponent } from '../layout/tool/tool.component';
import { ShopComponent } from '../layout/shop/shop.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  // imports: [RouterOutlet , NavbarComponent , FooterComponent],
  imports: [NgIf , RouterOutlet, NavbarComponent, FooterComponent , HomeComponent , ContactComponent , ShopComponent , AboutComponent , BrandComponent , CartComponent , CategoryComponent , LoginComponent , RegisterComponent , CheckoutComponent , PlatformComponent , ProfileComponent , ProductComponent , ServiceComponent, ToolComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
  title = 'Zhome';

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    const authRoutes = ['/login', '/register']; // Define the routes where navbar/footer should not appear
    return authRoutes.includes(this.router.url);
  }
}
