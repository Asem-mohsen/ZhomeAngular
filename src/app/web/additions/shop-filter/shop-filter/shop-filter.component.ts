import { Component } from '@angular/core';
import { CategoryFilterComponent } from './category-filter/category-filter/category-filter.component';
import { TecnologyFilterComponent } from './technology-filter/tecnology-filter/tecnology-filter.component';
import { BrandFilterComponent } from './brand-filter/brand-filter/brand-filter.component';
import { PlatformFilterComponent } from './platform-filter/platform-filter/platform-filter.component';

@Component({
  selector: 'app-shop-filter',
  standalone: true,
  imports: [CategoryFilterComponent , TecnologyFilterComponent , BrandFilterComponent , PlatformFilterComponent],
  templateUrl: './shop-filter.component.html',
  styleUrl: '../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css'
})
export class ShopFilterComponent {

}
