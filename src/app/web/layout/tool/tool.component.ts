import { Component ,ViewChild } from '@angular/core';
import { MovingDirection, WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-tool',
  standalone: true,
  imports: [],
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent {


  currentStep: number = 1;
  isPopupOpen: boolean = false;

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/tool')
    }
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }



}
