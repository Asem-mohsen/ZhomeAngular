import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ProductCardComponent } from "../../additions/product-card/product-card.component";
import { BrandService } from '../../../Services/brands/brand.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Brand } from '../../../Interfaces/brand';
import { TranslateModule } from '@ngx-translate/core';

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

  constructor(private _BrandsService : BrandService){}

  ngOnInit(): void {

    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/brands')
    }

    this._BrandsService.getBrandsPage().subscribe((res) => {
      this.brands = res.data.brands;
    })
  }
}
