import { CommonModule } from '@angular/common';
import { Technology } from './../../../../../../Interfaces/product';
import { Component, EventEmitter, Input, Output ,ViewEncapsulation } from '@angular/core';
import { ShopService } from '../../../../../../Services/Pages/Shop/shop.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tecnology-filter',
  standalone: true,
  imports: [CommonModule , TranslateModule],
  templateUrl: './tecnology-filter.component.html',
  styleUrl: '../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TecnologyFilterComponent {

  constructor(private shopService: ShopService) {}

  isCollapsed = true;

  @Input() technologies: string[] = [];

  @Output() filterChange = new EventEmitter<string[]>();

  selectedTechnology: string[] = [];

  onTechnologyChange(event: any, technology: string) {
    if (event.target.checked) {
      this.selectedTechnology.push(technology);
    } else {
      this.selectedTechnology = this.selectedTechnology.filter(t => t !== technology);
    }
    this.filterChange.emit(this.selectedTechnology);
  }


  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
