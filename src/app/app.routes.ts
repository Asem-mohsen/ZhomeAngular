import { Routes } from '@angular/router';
// User
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

// Guards
import { authGuard } from './gaurds/auth.guard';

// Admins
import { AdminComponent } from './admin/layout/admin/admin.component';
import { DashboardComponent } from './admin/layout/dashboard/dashboard.component';
import { BrandsComponent } from './admin/layout/brands/brands.component';
import { UserComponent } from './admin/layout/user/user.component';
import { CollectionsComponent } from './admin/layout/collections/collections.component';
import { CategoriesComponent } from './admin/layout/categories/categories.component';
import { InventoryComponent } from './admin/layout/inventory/inventory.component';
import { OrdersComponent } from './admin/layout/orders/orders.component';
import { PaymentsComponent } from './admin/layout/payments/payments.component';
import { PlatformsComponent } from './admin/layout/platforms/platforms.component';
import { PrroductsComponent } from './admin/layout/prroducts/prroducts.component';
import { RolesComponent } from './admin/layout/roles/roles.component';
import { SalesComponent } from './admin/layout/sales/sales.component';
import { SubscribersComponent } from './admin/layout/subscribers/subscribers.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './web/user-layout/user-layout.component';
import { FeaturesComponent } from './admin/layouts/features/features.component';


export const routes: Routes = [
  // User
   { path: '',  component: UserLayoutComponent,  children: [
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
      {path: 'tools', component: ToolComponent },
    ]
  },

  // Admin
  {
    path: 'admin', component: AdminLayoutComponent, data: { adminOnly: true }, canActivate: [authGuard]  ,children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: '', component: AdminComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'users', component: UserComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'collections', component: CollectionsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'features', component: FeaturesComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'platforms', component: PlatformsComponent },
    { path: 'products', component: PrroductsComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'subscribers', component: SubscribersComponent },

    ]
  },
    {path:'**' , redirectTo:'home'}
];
