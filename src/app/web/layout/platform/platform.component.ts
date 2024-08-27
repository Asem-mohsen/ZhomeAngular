import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Platform } from '../../../Interfaces/platform';
import { PlatformService } from '../../../Services/platforms/platform.service';
import { ProductCardComponent } from '../../additions/product-card/product-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductsService } from '../../../Services/products/products.service';
import { Product } from '../../../Interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [RouterLink , ProductCardComponent, CarouselModule],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.css'
})
export class PlatformComponent implements OnInit{

  platforms: Platform[] = [];

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

  constructor(private _PlatformService : PlatformService){}

  ngOnInit(): void
  {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/platforms')
    }

    this._PlatformService.getPlatfromsUserShow().subscribe((res) => {
      this.platforms = res.data.platforms;
    })
  }
}
