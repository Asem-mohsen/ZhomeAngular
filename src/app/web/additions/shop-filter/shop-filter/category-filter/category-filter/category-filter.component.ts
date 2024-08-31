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
  @Output() filterChange = new EventEmitter<string[]>();

  isCollapsed = true;

  constructor(private shopService: ShopService) {}

  selectedCategories: string[] = [];

  onCategoryChange(event: any, categoryId: string) {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.filterChange.emit(this.selectedCategories);
  }


  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
