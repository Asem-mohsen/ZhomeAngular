import { NavbarComponent } from './../additions/navbar/navbar.component';
import { Component , OnDestroy , OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
import { ProductsComponent } from '../layout/products/products.component';
import { RolesComponent } from '../layout/roles/roles.component';
import { SubscribersComponent } from '../layout/subscribers/subscribers.component';
import { FeaturesComponent } from '../layout/features/features.component';
import { SalesComponent } from '../layout/sales/sales.component';
import { PlatformsComponent } from '../layout/platforms/platforms.component';
import { SidebarComponent } from "../additions/sidebar/sidebar.component";
import { ScriptLoaderService } from '../services/scriptLoader/ScriptLoaderService.service';
import { StylesheetLoaderService } from '../services/scriptLoader/StylesheetLoader.service';
import { PageService } from '../../Services/Settings/Pages/page.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AdminComponent, BrandsComponent, UserComponent, ContactComponent, CategoriesComponent, CollectionsComponent, DashboardComponent, InventoryComponent, OrdersComponent, PaymentsComponent, PlatformsComponent, ProductsComponent, RolesComponent, SalesComponent, SubscribersComponent, FeaturesComponent, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  constructor(private scriptLoader: ScriptLoaderService , private stylesheetLoader: StylesheetLoaderService , private router : Router , private _pageService : PageService) { }


  ngOnInit() {

    this.loadAdminResources();
    // const savedPage = this._pageService.getCurrentPage();
    // if (savedPage) {
    //   console.log(savedPage)
    //   this.router.navigate([savedPage]);
    // } else {
    //   this._pageService.setCurrentPage('/admin/dashboard');
    // }

    // // Listen to route changes and save the current page
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     console.log(event.urlAfterRedirects)
    //     this._pageService.setCurrentPage(event.urlAfterRedirects); // Save the new route
    //   }
    // });
    // const savedPage = this._pageService.getCurrentPage(true);
    // if (savedPage && savedPage.startsWith('/admin')) {
    //   this.router.navigate([savedPage]);
    // } else {
    //   this.router.navigate(['/admin/dashboard']);
    // }

    // this.router.events.pipe(
    //   filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   if (event.urlAfterRedirects.startsWith('/admin')) {
    //     this._pageService.setCurrentPage(event.urlAfterRedirects, true);
    //   }
    // });

  }

  ngOnDestroy() {
    this.unloadAdminResources();
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


  private unloadAdminResources() {
    this.stylesheetLoader.unloadStylesheet('google-fonts');
    this.stylesheetLoader.unloadStylesheet('dataTablesBootstrap');
    this.stylesheetLoader.unloadStylesheet('dataTablesResponsive');
    this.stylesheetLoader.unloadStylesheet('dataTablesButtons');
    this.stylesheetLoader.unloadStylesheet('ionicons');
    this.stylesheetLoader.unloadStylesheet('tempusdominusBootstrap');
    this.stylesheetLoader.unloadStylesheet('icheckBootstrap');
    this.stylesheetLoader.unloadStylesheet('jqvmap');
    this.stylesheetLoader.unloadStylesheet('adminlte');
    this.stylesheetLoader.unloadStylesheet('overlayScrollbars');
    this.stylesheetLoader.unloadStylesheet('daterangepicker');
    this.stylesheetLoader.unloadStylesheet('summernote');
    this.stylesheetLoader.unloadStylesheet('styleAdmin');

    this.scriptLoader.unloadScript('jquery');
    this.scriptLoader.unloadScript('jqueryUI');
    this.scriptLoader.unloadScript('bootstrap');
    this.scriptLoader.unloadScript('chart');
    this.scriptLoader.unloadScript('sparkline');
    this.scriptLoader.unloadScript('jqvmap');
    this.scriptLoader.unloadScript('jqueryKnob');
    this.scriptLoader.unloadScript('moment');
    this.scriptLoader.unloadScript('daterangepicker');
    this.scriptLoader.unloadScript('tempusdominusBootstrap');
    this.scriptLoader.unloadScript('summernote');
    this.scriptLoader.unloadScript('overlayScrollbars');
    this.scriptLoader.unloadScript('dataTables');
    this.scriptLoader.unloadScript('dataTablesBootstrap');
    this.scriptLoader.unloadScript('dataTablesResponsive');
    this.scriptLoader.unloadScript('dataTablesResponsiveBS');
    this.scriptLoader.unloadScript('dataTablesButtons');
    this.scriptLoader.unloadScript('dataTablesButtonsBS');
    this.scriptLoader.unloadScript('jszip');
    this.scriptLoader.unloadScript('pdfmake');
    this.scriptLoader.unloadScript('pdfmakeFonts');
    this.scriptLoader.unloadScript('dataTablesButtonsHTML5');
    this.scriptLoader.unloadScript('dataTablesButtonsPrint');
    this.scriptLoader.unloadScript('dataTablesButtonsColVis');
    this.scriptLoader.unloadScript('bsCustomFileInput');
    this.scriptLoader.unloadScript('adminlte');
    this.scriptLoader.unloadScript('demo');
    this.scriptLoader.unloadScript('dashboard');
    this.scriptLoader.unloadScript('main');
  }
}
