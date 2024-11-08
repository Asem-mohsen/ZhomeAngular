import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Platform } from '../../../Interfaces/platform';
import { PlatformService } from '../../../Services/platforms/platform.service';
import { ProductCardComponent } from '../../additions/product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslationService } from '../../../Services/translation/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../Pipes/safeUrl/safe-url.pipe';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [CommonModule ,RouterLink , ProductCardComponent, CarouselModule , TranslateModule , SafeUrlPipe],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.css'
})
export class PlatformComponent implements OnInit{

  platforms: Platform[] = [];
  currentLang : string = 'en'
  activeTab : string = '';
  collapseStates: { [key: string]: boolean } = {};

  // Sliders
  ProductsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplaySpeed:5000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  constructor(private translationService : TranslationService ,private _PlatformService : PlatformService){}

  ngOnInit(): void
  {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/platforms')
    }

    this.currentLang = this.translationService.getLanguage();

    this._PlatformService.getPlatfroms().subscribe((res) => {
      this.platforms = res.data.platforms;
    })
  }

  toggleCollapse(section: string, id: number) {
    const key = `${section}-${id}`;
    this.collapseStates[key] = !this.collapseStates[key];
  }


}
