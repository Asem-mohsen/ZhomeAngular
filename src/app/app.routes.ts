import { Routes } from '@angular/router';

// User
import { UserLayoutComponent } from './web/user-layout/user-layout.component';
import { HomeComponent } from './web/layout/home/home.component';
import { ProductComponent } from './web/layout/product/product.component';
import { ShopFiltersComponent } from './web/layout/shop/shop-filters/shop-filters/shop-filters.component';

// Guards
import { authGuard } from './gaurds/auth.guard';


export const routes: Routes = [
  // User
   { path: '',  component: UserLayoutComponent,  children: [
      {path:'home', component:HomeComponent , title: 'Home'},
      {path:'' , redirectTo:'home', pathMatch:'full'},
      {path:'about',loadComponent: ()=> import('./web/layout/about/about.component').then((c)=>c.AboutComponent) , title: 'About'},
      {path:'shop' ,loadComponent: ()=> import('./web/layout/shop/shop.component').then((c)=>c.ShopComponent) , title: 'Shop'},
      {path:'shop/filters', component:ShopFiltersComponent, title: 'Shop'},
      {path:'cart',loadComponent: ()=> import('./web/layout/cart/cart.component').then((c)=>c.CartComponent), title: 'Cart'},
      {path:'login',loadComponent: ()=> import('./web/auth/login/login.component').then((c)=>c.LoginComponent), canActivate: [authGuard], title: 'Login'},
      {path:'register' ,loadComponent: ()=> import('./web/auth/register/register.component').then((c)=>c.RegisterComponent), canActivate: [authGuard], title: 'Register'},
      {path:'forgetPassword',loadComponent: ()=> import('./web/auth/forget-password/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent), canActivate: [authGuard], title: 'Forget Password'},
      {path:'product/:productId' , component:ProductComponent},
      {path:'brands',loadComponent: ()=> import('./web/layout/brand/brand.component').then((c)=>c.BrandComponent) ,title: 'Brands'},
      {path:'platforms',loadComponent: ()=> import('./web/layout/platform/platform.component').then((c)=>c.PlatformComponent), title: 'Platforms'},
      {path:'categories' ,loadComponent: ()=> import('./web/layout/category/category.component').then((c)=>c.CategoryComponent), title: 'Categories'},
      {path:'contact',loadComponent: ()=> import('./web/layout/contact/contact.component').then((c)=>c.ContactComponent), title: 'Contact Us'},
      {path:'profile',loadComponent: ()=> import('./web/layout/profile/profile.component').then((c)=>c.ProfileComponent), canActivate: [authGuard] , title: 'Profile'},
      {path:'profile/edit' , loadComponent: ()=> import('./web/layout/profile/edit-profile/edit/edit.component').then((c)=>c.EditComponent) , canActivate: [authGuard] , title: 'Edit Profile'},
      {path:'services',loadComponent: ()=> import('./web/layout/service/service.component').then((c)=>c.ServiceComponent) , title: 'Services'},
      {path:'checkout',loadComponent: ()=> import('./web/layout/checkout/checkout.component').then((c)=>c.CheckoutComponent) , title: 'Checkout'},
      {path:'tools',loadComponent: ()=> import('./web/layout/tool/tool.component').then((c)=>c.ToolComponent), title: 'Proposal' },
      {path:'interior-design',loadComponent: ()=> import('./web/layout/tool/interior-design/interior-design.component').then((c)=>c.InteriorDesignComponent), title: 'Interior Design' },
      {path:'proposal',loadComponent: ()=> import('./web/layout/tool/tool-index/tool-index.component').then((c)=>c.ToolIndexComponent), title: 'Designs' },
    ]

  },
  // {path:'**' , redirectTo:'home'},

];
