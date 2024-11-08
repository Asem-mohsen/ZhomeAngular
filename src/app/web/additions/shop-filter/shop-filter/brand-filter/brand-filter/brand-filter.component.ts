import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { ShopService } from '../../../../../../Services/Pages/Shop/shop.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brand-filter',
  standalone: true,
  imports: [CommonModule , TranslateModule],
  templateUrl: './brand-filter.component.html',
  styleUrls:['./brand-filter.component.css','../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css'],
})
export class BrandFilterComponent {

  @Input() brands: any[] = [];
  @Output() filterChange = new EventEmitter<string[]>();

  isCollapsed = true;

  constructor() {}

  selectedBrands: string[] = [];

  onBrandChange(event: any, brandId: string) {
    if (event.target.checked) {
      this.selectedBrands.push(brandId);
    } else {
      this.selectedBrands = this.selectedBrands.filter(id => id !== brandId);
    }
    this.filterChange.emit(this.selectedBrands);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
