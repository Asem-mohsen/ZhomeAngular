import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tecnology-filter',
  standalone: true,
  imports: [CommonModule , TranslateModule],
  templateUrl: './tecnology-filter.component.html',
  styleUrls:['./tecnology-filter.component.css','../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css'],
})
export class TecnologyFilterComponent {

  constructor() {}

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
