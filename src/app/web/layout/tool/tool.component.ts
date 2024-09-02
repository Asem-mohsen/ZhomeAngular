import { Component ,ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovingDirection, WizardComponent } from 'angular-archwizard';
import { AuthService } from '../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProposalService } from '../../../Services/tools/Proposal/proposal.service';
import { Platform } from '../../../Interfaces/platform';

@Component({
  selector: 'app-tool',
  standalone: true,
  imports: [CommonModule , TranslateModule , ReactiveFormsModule , NgIf],
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

  constructor(private _authService : AuthService , private _toaster : ToastrService , private _ProposalService : ProposalService ){}

  toolData: FormGroup = new FormGroup({
    Installed:       new FormControl(null, [Validators.required]),
    BuildingProject: new FormControl(null, [Validators.required]),
    Rooms:           new FormControl(null, [Validators.required]),
    RoomsInput:      new FormControl(null, [Validators.required]),
    Categories:      new FormControl(null, [Validators.required]),
    SystemType:      new FormControl(null, [Validators.required]),
    Platform:        new FormControl(null, [Validators.required]),
    Package:         new FormControl(null, [Validators.required]),

    email:   new FormControl(null, [Validators.required, Validators.email]),  
    Phone:   new FormControl(null, [Validators.required]),
    Name:    new FormControl(null, [Validators.required]),
    Address: new FormControl(null, [Validators.required]),
    Country: new FormControl(null, [Validators.required]),
    City:    new FormControl(null, [Validators.required]),
    file:    new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/tools')
    }

    this._ProposalService.getPlatforms().subscribe({
      next : (res) =>{
        this.platforms = res.platforms
      }
    })

    this.isLogged = this._authService.isAuthenticated();
  }

  next() {
    if (this.step < this.steps.length) {
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
    this._ProposalService.storeData(this.toolData.value).subscribe({
      next : (res) => {
        console.log(this.toolData.value)
        this._toaster.success('Sent Successfully')
      }
    })
  }

}
