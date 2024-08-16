import { NavbarComponent } from './../additions/navbar/navbar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../additions/footer/footer.component';
import { AdminComponent } from '../layout/admin/admin.component';
import { BrandsComponent } from '../layout/brands/brands.component';
import { UserComponent } from '../layout/user/user.component';
import { ContactComponent } from '../layout/contact/contact.component';
import { CategoriesComponent } from '../layout/categories/categories.component';
import { CollectionsComponent } from '../layout/collections/collections.component';
import { DashboardComponent } from '../layout/dashboard/dashboard.component';
import { InventoryComponent } from '../layout/inventory/inventory.component';
import { OrdersComponent } from '../layout/orders/orders.component';
import { PaymentsComponent } from '../layout/payments/payments.component';
import { PrroductsComponent } from '../layout/prroducts/prroducts.component';
import { RolesComponent } from '../layout/roles/roles.component';
import { SubscribersComponent } from '../layout/subscribers/subscribers.component';
import { FeaturesComponent } from '../layouts/features/features.component';
import { SalesComponent } from '../layout/sales/sales.component';
import { PlatformsComponent } from '../layout/platforms/platforms.component';
import { SidebarComponent } from "../additions/sidebar/sidebar.component";
import { ScriptLoaderService } from '../services/scriptLoader/ScriptLoaderService.service';
import { StylesheetLoaderService } from '../services/scriptLoader/StylesheetLoader.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AdminComponent, BrandsComponent, UserComponent, ContactComponent, CategoriesComponent, CollectionsComponent, DashboardComponent, InventoryComponent, OrdersComponent, PaymentsComponent, PlatformsComponent, PrroductsComponent, RolesComponent, SalesComponent, SubscribersComponent, FeaturesComponent, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  constructor(private scriptLoader: ScriptLoaderService , private stylesheetLoader: StylesheetLoaderService) { }

  ngOnInit() {
    this.loadAdminResources();
  }

  private async loadAdminResources() {
    try {
      // Load Stylesheets
      await this.stylesheetLoader.loadStylesheet('google-fonts', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback');
      await this.stylesheetLoader.loadStylesheet('dataTablesBootstrap', 'assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css');
      await this.stylesheetLoader.loadStylesheet('dataTablesResponsive', 'assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css');
      await this.stylesheetLoader.loadStylesheet('dataTablesButtons', 'assets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css');
      await this.stylesheetLoader.loadStylesheet('ionicons', 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
      await this.stylesheetLoader.loadStylesheet('tempusdominusBootstrap', 'assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css');
      await this.stylesheetLoader.loadStylesheet('icheckBootstrap', 'assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css');
      await this.stylesheetLoader.loadStylesheet('jqvmap', 'assets/plugins/jqvmap/jqvmap.min.css');
      await this.stylesheetLoader.loadStylesheet('adminlte', 'assets/dist/css/adminlte.min.css');
      await this.stylesheetLoader.loadStylesheet('overlayScrollbars', 'assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css');
      await this.stylesheetLoader.loadStylesheet('daterangepicker', 'assets/plugins/daterangepicker/daterangepicker.css');
      await this.stylesheetLoader.loadStylesheet('summernote', 'assets/plugins/summernote/summernote-bs4.min.css');
      await this.stylesheetLoader.loadStylesheet('styleAdmin', 'assets/dist/css/Style-Admin.css');

      // Load Scripts
      await this.loadAdminScripts();

      console.log('All admin resources loaded');
    } catch (error) {
      console.error('Error loading admin resources', error);
    }
  }

  private async loadAdminScripts() {
    try {
      await this.scriptLoader.loadScript('jquery', 'assets/plugins/jquery/jquery.min.js');
      await this.scriptLoader.loadScript('jqueryUI', 'assets/plugins/jquery-ui/jquery-ui.min.js');
      await this.scriptLoader.loadScript('bootstrap', 'assets/plugins/bootstrap/js/bootstrap.bundle.min.js');
      await this.scriptLoader.loadScript('chart', 'assets/plugins/chart.js/Chart.min.js');
      await this.scriptLoader.loadScript('sparkline', 'assets/plugins/sparklines/sparkline.js');
      await this.scriptLoader.loadScript('jqvmap', 'assets/plugins/jqvmap/jquery.vmap.min.js');
      await this.scriptLoader.loadScript('jqueryKnob', 'assets/plugins/jquery-knob/jquery.knob.min.js');
      await this.scriptLoader.loadScript('moment', 'assets/plugins/moment/moment.min.js');
      await this.scriptLoader.loadScript('daterangepicker', 'assets/plugins/daterangepicker/daterangepicker.js');
      await this.scriptLoader.loadScript('tempusdominusBootstrap', 'assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js');
      await this.scriptLoader.loadScript('summernote', 'assets/plugins/summernote/summernote-bs4.min.js');
      await this.scriptLoader.loadScript('overlayScrollbars', 'assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js');
      await this.scriptLoader.loadScript('dataTables', 'assets/plugins/datatables/jquery.dataTables.min.js');
      await this.scriptLoader.loadScript('dataTablesBootstrap', 'assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js');
      await this.scriptLoader.loadScript('dataTablesResponsive', 'assets/plugins/datatables-responsive/js/dataTables.responsive.min.js');
      await this.scriptLoader.loadScript('dataTablesResponsiveBS', 'assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js');
      await this.scriptLoader.loadScript('dataTablesButtons', 'assets/plugins/datatables-buttons/js/dataTables.buttons.min.js');
      await this.scriptLoader.loadScript('dataTablesButtonsBS', 'assets/plugins/datatables-buttons/js/buttons.bootstrap4.min.js');
      await this.scriptLoader.loadScript('jszip', 'assets/plugins/jszip/jszip.min.js');
      await this.scriptLoader.loadScript('pdfmake', 'assets/plugins/pdfmake/pdfmake.min.js');
      await this.scriptLoader.loadScript('pdfmakeFonts', 'assets/plugins/pdfmake/vfs_fonts.js');
      await this.scriptLoader.loadScript('dataTablesButtonsHTML5', 'assets/plugins/datatables-buttons/js/buttons.html5.min.js');
      await this.scriptLoader.loadScript('dataTablesButtonsPrint', 'assets/plugins/datatables-buttons/js/buttons.print.min.js');
      await this.scriptLoader.loadScript('dataTablesButtonsColVis', 'assets/plugins/datatables-buttons/js/buttons.colVis.min.js');
      await this.scriptLoader.loadScript('bsCustomFileInput', 'assets/plugins/bs-custom-file-input/bs-custom-file-input.min.js');
      await this.scriptLoader.loadScript('adminlte', 'assets/dist/js/adminlte.js');
      await this.scriptLoader.loadScript('demo', 'assets/dist/js/demo.js');
      await this.scriptLoader.loadScript('dashboard', 'assets/dist/js/pages/dashboard.js');
      await this.scriptLoader.loadScript('main', 'assets/dist/js/main.js');
    } catch (error) {
      console.error('Error loading admin scripts', error);
    }
  }

}
