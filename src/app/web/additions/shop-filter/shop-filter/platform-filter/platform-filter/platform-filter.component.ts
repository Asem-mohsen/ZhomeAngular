import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output  ,ViewEncapsulation} from '@angular/core';
import { ShopService } from '../../../../../../Services/Pages/Shop/shop.service';

@Component({
  selector: 'app-platform-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './platform-filter.component.html',
  styleUrl: '../../../../../layout/shop/shop-filters/shop-filters/shop-filters.component.css',
  encapsulation: ViewEncapsulation.None

})
export class PlatformFilterComponent {

  constructor(private shopService: ShopService) {}

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
