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
import { RolesComponent } from './admin/layout/roles/roles.component';
import { SalesComponent } from './admin/layout/sales/sales.component';
import { SubscribersComponent } from './admin/layout/subscribers/subscribers.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './web/user-layout/user-layout.component';
import { FeaturesComponent } from './admin/layout/features/features.component';
import { ProductsComponent } from './admin/layout/products/products.component';
import { PromocodesComponent } from './admin/layout/promocodes/promocodes.component';
import { ShopOrdersComponent } from './admin/layout/orders/shop/shop-orders/shop-orders.component';
import { ToolsOrdersComponent } from './admin/layout/orders/tools/tools-orders/tools-orders.component';
import { CreateAdminComponent } from './admin/layout/admin/create/create-admin/create-admin.component';
import { EditAdminComponent } from './admin/layout/admin/edit/edit-admin/edit-admin.component';
import { ShowAdminComponent } from './admin/layout/admin/show/show-admin/show-admin.component';
import { CreateBrandComponent } from './admin/layout/brands/create/create-brand/create-brand.component';
import { EditBrandComponent } from './admin/layout/brands/edit/edit-brand/edit-brand.component';
import { CreateCategoryComponent } from './admin/layout/categories/create/create-category/create-category.component';
import { EditCategoryComponent } from './admin/layout/categories/edit/edit-category/edit-category.component';
import { ShowCategoryComponent } from './admin/layout/categories/show/show-category/show-category.component';
import { CreateCollectionComponent } from './admin/layout/collections/create/create-collection/create-collection.component';
import { EditCollectionComponent } from './admin/layout/collections/edit/edit-collection/edit-collection.component';
import { ShowCollectionComponent } from './admin/layout/collections/show/show-collection/show-collection.component';
import { EditContactComponent } from './admin/layout/contact/edit/edit-contact/edit-contact.component';
import { CreateFeatureComponent } from './admin/layout/features/create/create-feature/create-feature.component';
import { EditFeatureComponent } from './admin/layout/features/edit/edit-feature/edit-feature.component';
import { CreatePromocodeComponent } from './admin/layout/promocodes/create/create-promocode/create-promocode.component';
import { EditPromocodeComponent } from './admin/layout/promocodes/edit/edit-promocode/edit-promocode.component';
import { createPlatform } from '@angular/core';
import { CreatePlatfromComponent } from './admin/layout/platforms/create/create-platfrom/create-platfrom.component';
import { EditPlatformComponent } from './admin/layout/platforms/edit/edit-platform/edit-platform.component';
import { CreateProductComponent } from './admin/layout/products/create/create-product/create-product.component';
import { EditProductComponent } from './admin/layout/products/edit/edit-product/edit-product.component';
import { ShowProductComponent } from './admin/layout/products/show/show-product/show-product.component';
import { CreateRoleComponent } from './admin/layout/roles/create/create-role/create-role.component';
import { EditRoleComponent } from './admin/layout/roles/edit/edit-role/edit-role.component';
import { CreateSaleComponent } from './admin/layout/sales/create/create-sale/create-sale.component';
import { EditSaleComponent } from './admin/layout/sales/edit/edit-sale/edit-sale.component';


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
      {path:'product/:productId' , component:ProductComponent},
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
    { path: 'admins', component: AdminComponent , children: [
          { path: 'create', component: CreateAdminComponent },
          { path: 'edit/:id', component: EditAdminComponent },
          { path: 'show/:id', component: ShowAdminComponent }
    ]},
    { path: 'users', component: UserComponent },
    { path: 'brands', component: BrandsComponent , children: [
          { path: 'create', component: CreateBrandComponent },
          { path: 'edit/:id', component: EditBrandComponent },
    ]},
      { path: 'categories', component: CategoriesComponent, children: [
          { path: 'create', component: CreateCategoryComponent },
          { path: 'edit/:id', component: EditCategoryComponent },
          { path: 'show/:id', component: ShowCategoryComponent },
    ]},
      { path: 'collections', component: CollectionsComponent, children: [
          { path: 'create', component: CreateCollectionComponent },
          { path: 'edit/:id', component: EditCollectionComponent },
          { path: 'show/:id', component: ShowCollectionComponent },
    ]},
    { path: 'contact', component: ContactComponent , children: [
          { path: 'edit/:id', component: EditContactComponent },
    ]},
    { path: 'features', component: FeaturesComponent , children: [
          { path: 'create', component: CreateFeatureComponent },
          { path: 'edit/:id', component: EditFeatureComponent },
    ]},
    { path: 'inventory', component: InventoryComponent },
      {
        path: 'orders', component: OrdersComponent, children: [
          { path: 'shop', component: ShopOrdersComponent },
          { path: 'tools', component: ToolsOrdersComponent }
    ]},
    { path: 'payments', component: PaymentsComponent },
    { path: 'promocodes', component: PromocodesComponent , children: [
          { path: 'create', component: CreatePromocodeComponent },
          { path: 'edit/:id', component: EditPromocodeComponent },
    ]},
    { path: 'payments', component: PaymentsComponent },
    { path: 'platforms', component: PlatformsComponent , children: [
          { path: 'create', component: CreatePlatfromComponent },
          { path: 'edit/:id', component: EditPlatformComponent },
    ]},
    { path: 'products', component: ProductsComponent , children: [
          { path: 'create', component: CreateProductComponent },
          { path: 'edit/:id', component: EditProductComponent },
          { path: 'show/:id', component: ShowProductComponent },
    ]},
    { path: 'roles', component: RolesComponent, children: [
          { path: 'create', component: CreateRoleComponent },
          { path: 'edit/:id', component: EditRoleComponent },
    ]},
    { path: 'sales', component: SalesComponent , children: [
          { path: 'create', component: CreateSaleComponent },
          { path: 'edit/:id', component: EditSaleComponent },
    ]},
    { path: 'subscribers', component: SubscribersComponent },

    ]
  },
    {path:'**' , redirectTo:'home'}
];
