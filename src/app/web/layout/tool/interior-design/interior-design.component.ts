import { Component, ViewChild } from '@angular/core';
import { Platform } from '../../../../Interfaces/platform';
import { AuthService } from '../../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProposalService } from '../../../../Services/tools/Proposal/proposal.service';
import { CountriesCitiesService } from '../../../../Services/countries-cities/countries-cities.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Furniture, Room, RoomDesign } from '../../../../Interfaces/interior-design';
import { RoomSelectionComponent } from "./room-selection/room-selection.component";
import { RoomDesignDisplayComponent } from "./room-design-display/room-design-display.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FurnitureItemsComponent } from './furniture-items/furniture-items.component';
import { InteriorDesignService } from '../../../../Services/tools/interior-design/interior-design.service';
import { ColorPaletteComponent } from "./color-palette/color-palette.component";
import { HomeTypeComponent } from "./home-type/home-type.component";

@Component({
  selector: 'app-interior-design',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, NgIf, FormsModule, NgFor, RoomSelectionComponent, RoomDesignDisplayComponent, CarouselModule, FurnitureItemsComponent, ColorPaletteComponent, HomeTypeComponent],
  templateUrl: './interior-design.component.html',
  styleUrl: './interior-design.component.css'
})
export class InteriorDesignComponent {

  @ViewChild(RoomSelectionComponent) roomSelectionComponent!: RoomSelectionComponent;

  step : number = 1;
  steps: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  isPopupOpen: boolean = false;
  isLogged : boolean = false
  platforms !: Platform[]

  countries: { name: string; flag: string; code: string }[] = [];
  cities: { name: string }[] = [];
  selectedCountry: string = '';
  selectedCity: string = '';
  isCitySelectDisabled: boolean = true;

  constructor(private _authService : AuthService , private _toaster : ToastrService , private _InteriorDesignService: InteriorDesignService , private countryCitiesService: CountriesCitiesService ){}

  selectedRooms: Room[] = [];

  furnitures: any[] = [];
  furnitureType: string = '';
  bedroomFurniture: any[] = [];
  wardrobeFurniture: any[] = [];
  chairFurniture: any[] = [];
  sofaFurniture: any[] = [];
  diningFurniture: any[] = [];

  FurnitureSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
        loop: false
      },
      400: {
        items: 2,
        loop: true
      },
      740: {
        items: 2,
        loop: true
      },
      940: {
        items: 4,
        loop: true
      }
    },
    nav: true,
  };

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/interior-design')
    }
  }

  onRoomsSelected(selectedRooms: Room[]) {

    this.selectedRooms = selectedRooms;
  }

  loadFurnitureImages(): void {
    const hasBedroom = this.selectedRooms.some(room =>room.name.toLowerCase() === 'bedrooms' || room.name.toLowerCase() === "kid's room" );
    const hasDinning = this.selectedRooms.some(room =>room.name.toLowerCase() === 'dinning rooms');
    const hasLiving  = this.selectedRooms.some(room => room.name.toLowerCase()=== "Living Rooms");

    this._InteriorDesignService.getFurnitureImages('modern living room armchair').subscribe(data => {
      this.chairFurniture = data.results;
    });

    if (hasBedroom) {
      this.furnitureType = 'bedroom';

      this._InteriorDesignService.getFurnitureImages('modern bedroom furniture').subscribe(data => {
        this.bedroomFurniture = data.results;
      });

      this._InteriorDesignService.getFurnitureImages('modern wardrobe design').subscribe(data => {
        this.wardrobeFurniture = data.results;
      });


    } else if(hasDinning) {
      this.furnitureType = 'dinning';

      this._InteriorDesignService.getFurnitureImages('modern sofa design').subscribe(data => {
        this.sofaFurniture = data.results;
      });

      this._InteriorDesignService.getFurnitureImages('modern dining table set').subscribe(data => {
        this.diningFurniture = data.results;
      });

    } else if(hasLiving){
      this.furnitureType = 'living';

      this._InteriorDesignService.getFurnitureImages('modern sofa design').subscribe(data => {
        this.sofaFurniture = data.results;
      });

    }
  }


  nextWithRooms() {
    this.selectedRooms = this.roomSelectionComponent.getSelectedRooms();
    this.loadFurnitureImages();

    if (this.selectedRooms.length > 0) {
      this.step++;
    }
  }

  next() {
    if (this.step < this.steps.length ) {
      this.step += 1;
    }
  }

  back() {
    if (this.step > 1) {
      this.step -= 1;
    }
  }

  goToStep(stepNumber: number) {
    this.step = stepNumber;
  }

}
