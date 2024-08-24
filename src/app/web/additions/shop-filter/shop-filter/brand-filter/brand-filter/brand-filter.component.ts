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
  @Output() filterChange: EventEmitter<number> = new EventEmitter<number>();

  isCollapsed = true;

  constructor(private shopService: ShopService) {}

  onBrandChange(brandId: number) {
    this.filterChange.emit(brandId);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
