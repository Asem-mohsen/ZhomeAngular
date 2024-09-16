import { Component, ViewChild } from '@angular/core';
import { Platform } from '../../../../Interfaces/platform';
import { AuthService } from '../../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProposalService } from '../../../../Services/tools/Proposal/proposal.service';
import { CountriesCitiesService } from '../../../../Services/countries-cities/countries-cities.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Room, RoomDesign } from '../../../../Interfaces/interior-design';
import { RoomSelectionComponent } from "./room-selection/room-selection.component";
import { RoomDesignDisplayComponent } from "./room-design-display/room-design-display.component";

@Component({
  selector: 'app-interior-design',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, NgIf, FormsModule, NgFor, RoomSelectionComponent, RoomDesignDisplayComponent],
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

  constructor(private _authService : AuthService , private _toaster : ToastrService , private _ProposalService : ProposalService , private countryCitiesService: CountriesCitiesService ){}

  selectedRooms: Room[] = [];

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/interior-design')
    }
  }

  onRoomsSelected(selectedRooms: Room[]) {
    console.log('Rooms Selected:', selectedRooms);
    this.selectedRooms = selectedRooms;
  }

  nextWithRooms() {
    this.selectedRooms = this.roomSelectionComponent.getSelectedRooms();
    console.log('Rooms Selected:', this.selectedRooms); // For debugging

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
