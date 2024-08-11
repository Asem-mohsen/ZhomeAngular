import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Platform } from '../Interfaces/platform';
import { PlatformService } from '../Services/platforms/platform.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [RouterLink , ProductCardComponent, SlickCarouselModule],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.css'
})
export class PlatformComponent implements OnInit{

  platforms: Platform[] = [];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows":false,
    "autoplaySpeed": 3000
  };

  constructor(private _PlatformService : PlatformService)
  {

  }

  ngOnInit(): void
  {
    this._PlatformService.getPlatfromsUserShow().subscribe((allPlatforms) => {
      this.platforms = Object.values(allPlatforms.data);
    })
  }
}
