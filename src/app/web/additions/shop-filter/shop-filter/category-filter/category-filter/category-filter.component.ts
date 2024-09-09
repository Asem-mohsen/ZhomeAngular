import { Component, EventEmitter, Input, Output , ViewEncapsulation } from '@angular/core';
import { ShopService } from '../../../../../../Services/Pages/Shop/shop.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../../../../Services/translation/translation.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule , TranslateModule],
  templateUrl: './category-filter.component.html',
  styleUrl: '../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css',
  encapsulation: ViewEncapsulation.None

})
export class CategoryFilterComponent {
  @Input() categories: any[] = [];
  @Output() filterChange = new EventEmitter<string[]>();
  currentLang : string = 'en'

  isCollapsed = true;

  constructor(private shopService: ShopService,private translationService : TranslationService) {}

  selectedCategories: string[] = [];

  ngOnInit(): void {
    this.currentLang = this.translationService.getLanguage();
  }

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
