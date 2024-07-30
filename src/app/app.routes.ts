import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';
import { PlatformComponent } from './platform/platform.component';
import { BrandComponent } from './brand/brand.component';
import { ProfileComponent } from './profile/profile.component';
import { ToolComponent } from './tool/tool.component';

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
