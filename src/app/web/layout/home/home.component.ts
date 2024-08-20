import { Component, OnInit, inject, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandService } from '../../../Services/brands/brand.service';
import { Brand } from '../../../Interfaces/brand';
import { PlatformService } from '../../../Services/platforms/platform.service';
import { Platform } from '../../../Interfaces/platform';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  brands:    Brand[] = [];
  platforms: Platform[] = [];

  PlatformSlider: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
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
  BrandsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  constructor(private _BrandService: BrandService , private _PlatformService : PlatformService)
  {

  }

  ngOnInit(): void
  {
    this._BrandService.getBrands().subscribe((result) => {
      this.brands = Object.values(result.data);
    })

    this._PlatformService.getPlatfroms().subscribe((allPlatforms) => {
      this.platforms = Object.values(allPlatforms.data);
    })
  }

}
