import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output , ViewEncapsulation } from '@angular/core';
import { ShopService } from '../../../../../../Services/Pages/Shop/shop.service';

@Component({
  selector: 'app-brand-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-filter.component.html',
  styleUrl: '../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BrandFilterComponent {

  @Input() brands: any[] = [];
  @Output() filterChange = new EventEmitter<string[]>();

  isCollapsed = true;

  constructor(private shopService: ShopService) {}

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
