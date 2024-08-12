import { Component ,ViewChild } from '@angular/core';
import { MovingDirection, WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-tool',
  standalone: true,
  imports: [],
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
  //  '../../assets/css/bd-wizard.css'
})
export class ToolComponent {


  currentStep: number = 1;
  isPopupOpen: boolean = false;


  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

}
