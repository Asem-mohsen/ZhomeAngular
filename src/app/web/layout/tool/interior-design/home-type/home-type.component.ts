import { Component } from '@angular/core';
import { Room } from '../../../../../Interfaces/interior-design';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-type.component.html',
  styleUrls: ['./home-type.component.css' , '../interior-design.component.css']
})
export class HomeTypeComponent {

  homes: Room[] = [
    {
      id: 'Apartment',
      name: 'Apartment',
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/HomeType/home.webp',
      checked: false,
    },
    {
      id: 'Villa',
      name: 'Villa',
      image:
        './assets/imgs/Admin/img/web/Tools/InteriorDesign/HomeType/villa.webp',
      checked: false,
    },
  ]

  toggleCheck(room: Room) {
    room.checked = !room.checked;
  }
}
