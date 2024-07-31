import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { BrandComponent } from './brand/brand.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PlatformComponent } from './platform/platform.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { ToolComponent } from './tool/tool.component';
import { ShopComponent } from './shop/shop.component';
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
