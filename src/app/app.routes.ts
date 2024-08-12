import { Routes } from '@angular/router';
import { HomeComponent } from './web/layout/home/home.component';
import { ShopComponent } from './web/layout/shop/shop.component';
import { CartComponent } from './web/layout/cart/cart.component';
import { AboutComponent } from './web/layout/about/about.component';
import { LoginComponent } from './web/auth/login/login.component';
import { RegisterComponent } from './web/auth/register/register.component';
import { ProductComponent } from './web/layout/product/product.component';
import { ServiceComponent } from './web/layout/service/service.component';
import { ContactComponent } from './web/layout/contact/contact.component';
import { CategoryComponent } from './web/layout/category/category.component';
import { PlatformComponent } from './web/layout/platform/platform.component';
import { BrandComponent } from './web/layout/brand/brand.component';
import { ProfileComponent } from './web/layout/profile/profile.component';
import { ToolComponent } from './web/layout/tool/tool.component';

export const routes: Routes = [
    {path:'home' , component:HomeComponent},
    {path:'' , redirectTo:'home', pathMatch:'full'},
    {path:'about' , component:AboutComponent},
    {path:'shop' , component:ShopComponent},
    {path:'cart' , component:CartComponent},
    {path:'login' , component:LoginComponent},
    {path:'register' , component:RegisterComponent},
    {path:'product' , component:ProductComponent},
    {path:'brands' , component:BrandComponent},
    {path:'platforms' , component:PlatformComponent},
    {path:'categories' , component:CategoryComponent},
    {path:'contact' , component:ContactComponent},
    {path:'profile' , component:ProfileComponent},
    {path:'services' , component:ServiceComponent},
    {path:'tools' , component:ToolComponent},
    {path:'**' , redirectTo:'home'}
];
