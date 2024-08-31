import { ShopService } from './../../../../../Services/Pages/Shop/shop.service';
import { Component, NgModule } from '@angular/core';
import { Product } from '../../../../../Interfaces/product';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../../additions/product-card/product-card.component';
import { CategoryFilterComponent } from "../../../../additions/shop-filter/shop-filter/category-filter/category-filter/category-filter.component";
import { BrandFilterComponent } from '../../../../additions/shop-filter/shop-filter/brand-filter/brand-filter/brand-filter.component';
import { PlatformFilterComponent } from '../../../../additions/shop-filter/shop-filter/platform-filter/platform-filter/platform-filter.component';
import { TecnologyFilterComponent } from '../../../../additions/shop-filter/shop-filter/technology-filter/tecnology-filter/tecnology-filter.component';
import { SearchPipe } from '../../../../../Pipes/search/search.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../../../Pipes/filter/filter.pipe';

@Component({
  selector: 'app-shop-filters',
  standalone: true,
  imports: [RouterLink,ProductCardComponent, CategoryFilterComponent , BrandFilterComponent , PlatformFilterComponent , TecnologyFilterComponent , SearchPipe , FormsModule , CommonModule , FilterPipe],
  templateUrl: './shop-filters.component.html',
  styleUrl: './shop-filters.component.css'
})
export class ShopFiltersComponent {

  searchWord : string = '';

  constructor(private _ShopService : ShopService){}

  filterData: any = {};
  products : Product [] = [];

  filteredProducts: Product[] = [];
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

      this._ShopService.getShopFilterPage().subscribe({
        next: (res) => {
          this.products = res.data.products.data;
          this.filterData = res.data;
          this.applyFilters();

        }
      });

      this.loadProducts();
    }

    onFilterChange(selectedItems: string[], filterType: string) {
      this.selectedFilters[filterType] = selectedItems;
      this.applyFilters();
    }

    applyFilters() {
      this.filteredProducts = new FilterPipe().transform(this.products, this.selectedFilters);
    }

    resetFilters(): void {
      this.selectedFilters = {
        category: null,
        brand: null,
        platform: null,
        technology: null,
        minPrice: null,
        maxPrice: null,
      };
      this.filteredProducts = this.products;
    }

    getCategoryFilter(categroyId : number)
    {
      this._ShopService.getCategoryFilterPage(categroyId).subscribe({
        next: (res) => {
          this.filterData = res.data;
        },
      });
    }

    getsubCatgoryFilter(subcategoryId : number)
    {
      this._ShopService.getSubcategoryFilterPage(subcategoryId).subscribe({
        next: (res) => {
          this.filterData = res.data;
        },
      });
    }

    getBrandFilter(brandId : number)
    {
      this._ShopService.getBrandFilterPage(brandId).subscribe({
        next: (res) => {
          this.filterData = res.data;
        },
      });
    }

    getPlatformFilter(platformId : number)
    {
      this._ShopService.getPlatformFilterPage(platformId).subscribe({
        next: (res) => {
          this.filterData = res.data;
        },
      });
    }

    loadFilterData() {

    }

    loadProducts() {
      // Implement your method to load products based on selected filters
    }

}
