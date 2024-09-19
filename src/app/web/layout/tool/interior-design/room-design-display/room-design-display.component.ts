import { CommonModule } from '@angular/common';
import { Component, Input ,OnChanges, SimpleChanges} from '@angular/core';
import { Room , RoomDesign } from '../../../../../Interfaces/interior-design';
import { InteriorDesignService } from '../../../../../Services/tools/interior-design/interior-design.service';

@Component({
  selector: 'app-room-design-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-design-display.component.html',
  styleUrls: ['./room-design-display.component.css' , '../interior-design.component.css']
})
export class RoomDesignDisplayComponent {

  @Input() selectedRooms: Room[] = [];
  roomDesigns: any[] = [];

  constructor(private _InteriorDesignService : InteriorDesignService){}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRooms'] && changes['selectedRooms'].currentValue) {
      this.loadImages();
    }
  }

  loadImages() {
    this.selectedRooms.forEach(room => {
      this._InteriorDesignService.getRoomImages(room.name + " design furnitures").subscribe(response => {
        this.roomDesigns.push(...response.results.map((img: any) => ({
          id: img.id,
          roomId: room.id,
          image: img.urls.small,
          checked: false,
        })));
      });
    });
  }

  getFilteredDesigns() {
    return this.roomDesigns.filter(design => this.selectedRooms.some(room => room.id === design.roomId));
  }

  toggleCheck(design: RoomDesign) {
    design.checked = !design.checked;
  }
}
