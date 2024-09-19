import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Furniture } from '../../../../../Interfaces/interior-design';
import { InteriorDesignService } from '../../../../../Services/tools/interior-design/interior-design.service';

@Component({
  selector: 'app-furniture-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './furniture-items.component.html',
  styleUrls: ['./furniture-items.component.css' , '../interior-design.component.css']
})
export class FurnitureItemsComponent {

  @Input() furniture!: any;

  toggleCheck(furniture: Furniture) {
    furniture.checked = !furniture.checked;
  }

}
