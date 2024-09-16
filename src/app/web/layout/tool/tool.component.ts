import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators , AbstractControl, NgModel, FormsModule} from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProposalService } from '../../../Services/tools/Proposal/proposal.service';
import { Platform } from '../../../Interfaces/platform';
import { CountriesCitiesService } from '../../../Services/countries-cities/countries-cities.service';

@Component({
  selector: 'app-tool',
  standalone: true,
  imports: [CommonModule , TranslateModule , ReactiveFormsModule , NgIf , FormsModule , NgFor],
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent {
  // steps
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

  toolData: FormGroup = new FormGroup({
    Installed:       new FormControl(null, [Validators.required]),
    BuildingProject: new FormControl(null, [Validators.required]),
    Rooms:           new FormControl(null, [Validators.required]),
    RoomsInput:      new FormControl(null, [Validators.required]),
    Categories:      new FormArray([]),
    SystemType:      new FormControl(null, [Validators.required]),
    Platform:        new FormControl(null, [Validators.required]),
    Package:         new FormControl(null, [Validators.required]),

    Email:   new FormControl(null, [Validators.required, Validators.email]),
    Phone:   new FormControl(null, [Validators.required]),
    Name:    new FormControl(null, [Validators.required]),
    Address: new FormControl(null, [Validators.required]),
    Country: new FormControl(null, [Validators.required]),
    City:    new FormControl(null, [Validators.required]),
    file:    new FormControl(null, [Validators.required]),
  });

  categories = [
    { id: 'Lighting', value: 'Lighting', label: 'Lighting', icon: 'fa-solid fa-lightbulb' , selected: false },
    { id: 'Heating' , value: 'Heating', label: 'Heating', icon: 'fa-solid fa-fire', selected: false  },
    { id: 'Security', value: 'Security', label: 'Security', icon: 'fa-solid fa-shield-halved', selected: false  },
    { id: 'Entertainment', value: 'Entertainment', label: 'Entertainment', icon: 'fa-solid fa-fire', selected: false  },
    { id: 'Shutters', value: 'Shutters', label: 'Shutters', icon: 'fa-solid fa-house-chimney-window', selected: false  },
    { id: 'GarageGates', value: 'GarageGates', label: 'GarageGates', icon: 'fa-solid fa-fire', selected: false  },
    { id: 'AccessControl', value: 'AccessControl', label: 'AccessControl', icon: 'fa-solid fa-house-signal', selected: false  },
    { id: 'AcControl', value: 'AcControl', label: 'AcControl', icon: 'fa-solid fa-snowflake', selected: false  },
  ];


  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/tools')
    }

    this.loadCountries();

    this.categories.forEach((category) => {
      (this.toolData.get('Categories') as FormArray).push(
        new FormControl(false)
      );
    });

    this._ProposalService.getPlatforms().subscribe({
      next : (res) =>{
        this.platforms = res.data.platforms
      }
    })

    this.isLogged = this._authService.isAuthenticated();

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

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  sumbitToolData()
  {
    const selectedCategories = this.categories
      .filter((_, index) => (this.toolData.get('Categories') as FormArray).at(index).value)
      .map(category => category.value);

    const formData = {
      ...this.toolData.value,
      Categories: selectedCategories,
    };

    this._ProposalService.storeData(formData).subscribe({
      next: (res) => {
        this._toaster.success('Sent Successfully');
        this.toolData.reset();

        // Reset selected categories
        this.categories.forEach(category => category.selected = false);

        (this.toolData.get('Categories') as FormArray).clear();

        this.categories.forEach(() => {
          (this.toolData.get('Categories') as FormArray).push(new FormControl(false));
        });

        this.step = 1;


      },
    });
  }


  loadCountries(): void {
    this.countryCitiesService.getCountries().subscribe({
      next: (data) => {
        this.countries = data.map((country: any) => ({
          name: country.name.common,
          flag: country.flags.png,
          code: country.cca2
        }));
      },
      error: (error) => console.error('Error fetching countries:', error)
    });
  }

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (!value) {
      return;
    }

    this.selectedCountry = value;
    this.isCitySelectDisabled = false;

    this.countryCitiesService.getCities(value).subscribe({
      next: (data) => {
        this.cities = data.data;
      },
      error: (error) => console.error('Error fetching cities:', error)
    });
  }
}
