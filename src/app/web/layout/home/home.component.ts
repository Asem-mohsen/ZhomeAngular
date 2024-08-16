import { Component, OnInit, inject, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandService } from '../../../Services/brands/brand.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Brand } from '../../../Interfaces/brand';
import { PlatformService } from '../../../Services/platforms/platform.service';
import { Platform } from '../../../Interfaces/platform';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlickCarouselModule , RouterLink , RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  brands:    Brand[] = [];
  platforms: Platform[] = [];

  slideConfig = {
    "slidesToShow": 6,
    "slidesToScroll": 4,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows":false,
    "autoplaySpeed": 3000
  };

  slidePlatform = {
    "slidesToShow": 4,
    "slidesToScroll": 0,
    "dots": false,
    "infinite": false,
    "autoplay": false,
    "arrows":false,
  };

  constructor(private _BrandService: BrandService , private _PlatformService : PlatformService)
  {

  }

  ngOnInit(): void
  {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/home')
    }
    this._BrandService.getBrands().subscribe((result) => {
      this.brands = Object.values(result.data);
    })

    this._PlatformService.getPlatfroms().subscribe((allPlatforms) => {
      this.platforms = Object.values(allPlatforms.data);
    })
  }

}
