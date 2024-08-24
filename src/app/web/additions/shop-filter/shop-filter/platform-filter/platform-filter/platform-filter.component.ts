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
  @Output() filterChange: EventEmitter<number> = new EventEmitter<number>();

  isCollapsed = true ;

  onPlatformChange(platformId: number) {
    this.filterChange.emit(platformId);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
