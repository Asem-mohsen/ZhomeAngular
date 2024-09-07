import { ShopService } from './../../../../../Services/Pages/Shop/shop.service';
import { Component, Inject, NgModule, PLATFORM_ID, ViewChild } from '@angular/core';
import { Product } from '../../../../../Interfaces/product';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../../additions/product-card/product-card.component';
import { CategoryFilterComponent } from "../../../../additions/shop-filter/shop-filter/category-filter/category-filter/category-filter.component";
import { BrandFilterComponent } from '../../../../additions/shop-filter/shop-filter/brand-filter/brand-filter/brand-filter.component';
import { PlatformFilterComponent } from '../../../../additions/shop-filter/shop-filter/platform-filter/platform-filter/platform-filter.component';
import { TecnologyFilterComponent } from '../../../../additions/shop-filter/shop-filter/technology-filter/tecnology-filter/tecnology-filter.component';
import { SearchPipe } from '../../../../../Pipes/search/search.pipe';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../../../Pipes/filter/filter.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { Options , LabelType} from '@angular-slider/ngx-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CarouselModule , OwlOptions } from 'ngx-owl-carousel-o';
import { MatPaginatorModule , PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-shop-filters',
  standalone: true,
  imports: [RouterLink,ProductCardComponent, NgIf , MatPaginatorModule , CarouselModule , CategoryFilterComponent , BrandFilterComponent , PlatformFilterComponent , TecnologyFilterComponent , SearchPipe , FormsModule , CommonModule , FilterPipe , TranslateModule , NgxSliderModule],
  templateUrl: './shop-filters.component.html',
  styleUrl: './shop-filters.component.css'
})
export class ShopFiltersComponent {

  searchWord : string = '';
  isBrowser: boolean;

  paginatedProducts: Product[] = [];
  currentPage: number = 0; // Page index starts at 0
  itemsPerPage: number = 10;
  totalProducts: number = 0;

  constructor(private _ShopService : ShopService , @Inject(PLATFORM_ID) private platformId: object){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  @ViewChild(MatPaginatorModule) paginator!: MatPaginatorModule;

  filterData: any = {
    Filter_Data: {
      categories: [],
      brands: [],
      platforms: [],
      technologies: [],
      minPrice: 0,
      maxPrice: 500,
    }
  };

  products : Product [] = [];

  filteredProducts: Product[] = [];

  minPrice: number = 0;
  maxPrice: number = 500;

  priceOptions: Options = {
    floor: 0,
    ceil: 500,
    step: 10,
    translate: (value: number): string => {
      return 'EGP' + value;
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      return 'from ' + minValue + ' up to ' + maxValue;
    }
  };

  ShopSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplayTimeout: 10000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        loop: false
      },
      400: {
        items: 1,
        loop: true
      },
      740: {
        items: 1,
        loop: true
      },
      940: {
        items: 1,
        loop: true
      }
    },
    nav: true,
    rtl: false
  }

  selectedFilters: any = {
    category: [],
    brand: [],
    platform: [],
    technology: [],
  };


    ngOnInit(): void {

      if (typeof localStorage != 'undefined') {
        localStorage.setItem('currentPage', '/shop/filters')
      }

      if (this.isBrowser) {
        this.setupSlider();
      }

    }

    setupSlider() {
      this._ShopService.getShopFilterPage().subscribe({
        next: (res) => {
          this.products = res.data.products.data;
          this.filterData = res.data;
          this.filteredProducts = [...this.products];
          this.totalProducts = this.filteredProducts.length;
          this.minPrice = this.filterData.Filter_Data.minPrice;
          this.maxPrice = this.filterData.Filter_Data.maxPrice;
  
          this.priceOptions = {
            ...this.priceOptions,
            floor: this.minPrice,
            ceil: this.maxPrice,
          };
  
          // this.applyFilters();
          this.applyPagination();
        }
      });
    }

    onFilterChange(selectedItems: string[], filterType: string) {
      this.selectedFilters[filterType] = selectedItems;
      this.applyFilters();
    }

    applyFilters() {
      const filters = {
        ...this.selectedFilters,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      };

      this.filteredProducts = new FilterPipe().transform(this.products, filters);
      this.applyPagination();
    }

    resetFilters(): void {
      this.selectedFilters = {
        category: [],
        brand: [],
        platform: [],
        technology: [],
      };
      this.filteredProducts = [...this.products];
      this.searchWord = '';
    }

    applyPagination() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedProducts = this.filteredProducts.slice(start, end);
    }
  
    onPageChange(event: PageEvent) {
      this.currentPage = event.pageIndex;
      this.itemsPerPage = event.pageSize;
      this.applyPagination();
    }

}
