import { Router, RouterLink } from '@angular/router';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductCardComponent } from "../../additions/product-card/product-card.component";
import { BrandService } from '../../../Services/brands/brand.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Brand } from '../../../Interfaces/brand';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [ProductCardComponent , CarouselModule , RouterLink, TranslateModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {

  brands: Brand[] = [];

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
    autoplay: true,
    autoplaySpeed:5000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 5
      },
      740: {
        items: 6
      },
      940: {
        items: 7
      }
    },
    nav: false
  }

  constructor(private _BrandsService : BrandService, @Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {

    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/brands')
    }

    if(isPlatformBrowser(this.platformId)){
      this._BrandsService.getBrands().subscribe((res) => {
        this.brands = res.data.brands;
      })
    }

  }
}
