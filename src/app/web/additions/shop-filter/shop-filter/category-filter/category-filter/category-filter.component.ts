import { Component, EventEmitter, Input, Output , ViewEncapsulation } from '@angular/core';
import { ShopService } from '../../../../../../Services/Pages/Shop/shop.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: '../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css',
  encapsulation: ViewEncapsulation.None

})
export class CategoryFilterComponent {
  @Input() categories: any[] = [];
  @Output() filterChange: EventEmitter<number> = new EventEmitter<number>();

  isCollapsed = true;

  constructor(private shopService: ShopService) {}

  onCategoryChange(categoryId: number) {
    this.filterChange.emit(categoryId);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
