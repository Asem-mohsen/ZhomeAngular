import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../../../../Services/translation/translation.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule , TranslateModule],
  templateUrl: './category-filter.component.html',
  styleUrls:['./category-filter.component.css','../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css'],
})
export class CategoryFilterComponent {
  @Input() categories: any[] = [];
  @Output() filterChange = new EventEmitter<string[]>();
  currentLang : string = 'en'

  isCollapsed = true;

  constructor(private translationService : TranslationService) {}

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
