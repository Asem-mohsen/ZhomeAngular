import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Platform } from '../../../Interfaces/platform';
import { PlatformService } from '../../../Services/platforms/platform.service';
import { ProductCardComponent } from '../../additions/product-card/product-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductsService } from '../../../Services/products/products.service';
import { Product } from '../../../Interfaces/product';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [RouterLink , ProductCardComponent, SlickCarouselModule],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.css'
})
export class PlatformComponent implements OnInit{

  platforms: Platform[] = [];
  products : Product[]  = [];
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows":false,
    "autoplaySpeed": 3000
  };

  constructor(private _PlatformService : PlatformService , private _ProductService : ProductsService)
  {

  }

  ngOnInit(): void
  {
    // if (typeof localStorage != 'undefined') {
    //   localStorage.setItem('currentPage', '/platforms')
    // }

    this._PlatformService.getPlatfromsUserShow().subscribe((allPlatforms) => {
      this.platforms = Object.values(allPlatforms.data);
    })

    this._ProductService.getProduct().subscribe((allProducts) =>{
      this.products = Object.values(allProducts.data);
    })
  }
}
