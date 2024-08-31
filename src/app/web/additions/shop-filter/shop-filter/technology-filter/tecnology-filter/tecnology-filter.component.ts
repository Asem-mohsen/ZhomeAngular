import { CommonModule } from '@angular/common';
import { Technology } from './../../../../../../Interfaces/product';
import { Component, EventEmitter, Input, Output ,ViewEncapsulation } from '@angular/core';
import { ShopService } from '../../../../../../Services/Pages/Shop/shop.service';

@Component({
  selector: 'app-tecnology-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tecnology-filter.component.html',
  styleUrl: '../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TecnologyFilterComponent {

  constructor(private shopService: ShopService) {}

  isCollapsed = true;

  @Input() technologies: any[] = [];

  @Output() filterChange = new EventEmitter<string[]>();

  selectedTechnology: string[] = [];

  onPlatformChange(event: any, Technology: string) {
    if (event.target.checked) {
      this.selectedTechnology.push(Technology);
    } else {
      this.selectedTechnology = this.selectedTechnology.filter(id => id !== Technology);
    }
    this.filterChange.emit(this.selectedTechnology);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
