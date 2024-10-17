import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output  ,ViewEncapsulation} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-platform-filter',
  standalone: true,
  imports: [CommonModule ,TranslateModule],
  templateUrl: './platform-filter.component.html',
  styleUrls:['./platform-filter.component.css','../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PlatformFilterComponent {

  constructor() {}

  @Input() platforms: any[] = [];
  @Output() filterChange = new EventEmitter<string[]>();

  isCollapsed = true ;

  selectedPlatforms: string[] = [];

  onPlatformChange(event: any, platformId: string) {
    if (event.target.checked) {
      this.selectedPlatforms.push(platformId);
    } else {
      this.selectedPlatforms = this.selectedPlatforms.filter(id => id !== platformId);
    }
    this.filterChange.emit(this.selectedPlatforms);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }


}
