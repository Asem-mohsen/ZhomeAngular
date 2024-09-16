import { Component, Output , EventEmitter } from '@angular/core';
import { Room } from '../../../../../Interfaces/interior-design';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.css' , '../interior-design.component.css']
})
export class RoomSelectionComponent {

  @Output() roomSelected = new EventEmitter<Room[]>();

  rooms: Room[] = [
    {
      id: 'bedroom',
      name: 'Bedrooms',
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/Rooms/4ISWTGCTDAkv5rfRHBGR0Hl1b8Mk5RiUjv1vdxkL.webp',
      checked: false,
    },
    {
      id: 'living',
      name: 'Living Rooms',
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/Rooms/QZwU6AbfmNe47C0UsCWKWLkTZ9XRRwKvBC1OM5Pg.webp',
      checked: false,
    },
    {
      id: 'dinning',
      name: 'Dinning Rooms',
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/Rooms/ERccbxLFHSQaWHXmmJFJ5KUmJ9wewLWHNOuHt5WY.webp',
      checked: false,
    },
    {
      id: 'outdoor',
      name: 'Outdoor',
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/Rooms/rjREujfbU2zYbKBRwexSHoTUrGAS9AXEk7LMW3Za.webp',
      checked: false,
    },
    {
      id: 'office',
      name: 'Office',
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/Rooms/1Ht8IAcvMxG9iomxBQF4dXtnay6HhQBKbP9KlRbH.webp',
      checked: false,
    },
    {
      id: 'Kids',
      name: "Kid's Room",
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/Rooms/2I5Vx5C9rdMEJ29q3i3G6PmfRbEtwI4s3UVzUBvE.webp',
      checked: false,
    },
    {
      id: 'Reception',
      name: 'Reception',
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/Rooms/Oijb1zTmWOOCwDRAi9UUy4BD9JI85bvhriMR2GCL.webp',
      checked: false,
    },
  ];


  toggleCheck(room: Room) {
    room.checked = !room.checked;
  }

  getSelectedRooms() {
    return this.rooms.filter(room => room.checked);
  }
}
