import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.css'
})
export class ColorPaletteComponent {

  customPalette: string[] = [];
  maxColors : boolean = false;
  palettes = [
    { id: 1, colors: ['#FF6B6B', '#FFE66D', '#4472CA', '#52B788'], checked: false },
    { id: 2, colors: ['#B5838D', '#6D6875', '#FFB4A2', '#E5989B'], checked: false },
    { id: 3, colors: ['#00A19D', '#FFCD3C', '#EB5757', '#66BFBF'], checked: false },
    { id: 4, colors: ['#384B70', '#507687', '#FCFAEE', '#B8001F'], checked: false },
    { id: 5, colors: ['#D2E0FB', '#FFE5CF', '#DEE5D4', '#8EACCD'], checked: false },
    { id: 6, colors: ['#FF885B', '#FFE5CF', '#557C56', '#33372C'], checked: false },
    { id: 7, colors: ['#16423C', '#6A9C89', '#C4DAD2', '#E9EFEC'], checked: false },
    { id: 8, colors: ['#FF6B6B', '#FFE66D', '#4472CA', '#52B788'], checked: false },
    { id: 9, colors: ['#B5838D', '#6D6875', '#FFB4A2', '#E5989B'], checked: false },
    { id: 10, colors: ['#00A19D', '#FFCD3C', '#EB5757', '#66BFBF'], checked: false },
    { id: 11, colors: ['#384B70', '#507687', '#FCFAEE', '#B8001F'], checked: false },
  ];

  addColorToCustomPalette(color: string) {
    if (this.customPalette.length < 4) {
      this.customPalette.push(color);
    }
    if (this.customPalette.length === 4) {
      this.maxColors = true;
    }
  }

  selectPalette(palette: any) {
    console.log('Selected Palette:', palette);
  }

  toggleCheck(palette: any) {
    palette.checked = !palette.checked;
  }

  isPopupVisible: boolean = false;

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  clearCustomPalette() {
    this.customPalette = [];
    this.maxColors = false;
  }

  addCustomPaletteToList() {
    const newPalette = {
      id: this.palettes.length + 1,
      colors: [...this.customPalette],
      checked: false
    };
    this.palettes.push(newPalette);
    this.clearCustomPalette();
    this.closePopup();
  }

}
