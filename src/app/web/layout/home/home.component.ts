import { Component, OnInit, inject, afterNextRender, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandService } from '../../../Services/brands/brand.service';
import { Brand } from '../../../Interfaces/brand';
import { PlatformService } from '../../../Services/platforms/platform.service';
import { Platform } from '../../../Interfaces/platform';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, NgFor, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , CarouselModule , TranslateModule , CommonModule , NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  brands:    Brand[] = [];

  platforms: Platform[] = [];

  activeTab: string = 'Recommended';

  activeTestmonialsTab = 0;

  tabs = [
    {
      name: 'Alaa Abdelghafar',
      company: 'Allegria Sodic compound',
      image: './assets/imgs/UI/website/Home/testmonials/algeria.jpeg',
      alt: 'Alegria testimonials',
    },
    {
      name: 'Sherif Youssef',
      company: 'Mivida',
      image: './assets/imgs/UI/website/Home/testmonials/Mivida-logo.png',
      alt: 'Mivida testimonials',
    },
    {
      name: 'Osama Elsayed',
      company: 'Mountain View Hyde Park',
      image: './assets/imgs/UI/website/Home/testmonials/mountain.png',
      alt: 'Mountain View testimonials',
    },
  ];

  contents = [
    {
      id: 'content1',
      name: 'Alaa Abdelghafar',
      review:
        'ZHome was very helpful in upgrading my old security system and integrating it with my easy-to-use smart home system.',
    },
    {
      id: 'content2',
      name: 'Sherif Youssef',
      review:
        'I was really surprised to find such a transparent and professional online platform like ZHome. They are very experienced and always there for me.',
    },
    {
      id: 'content3',
      name: 'Osama Elsayed',
      review: 'Mountain View Hyde Park customer review here.',
    },
  ];

  stars = [1, 2, 3, 4, 5];

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
    nav: false,
    rtl: true,
  }

  constructor(private _BrandService: BrandService , private _PlatformService : PlatformService , @Inject(PLATFORM_ID) private platformId: Object)
  {

  }

  ngOnInit(): void
  {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/home')
    }

    if (isPlatformBrowser(this.platformId)) {
      this._BrandService.getBrands().subscribe((result) => {
        this.brands = result.data.Brands;
      })

      this._PlatformService.getPlatfroms().subscribe((allPlatforms) => {
        this.platforms = allPlatforms.data.Platforms;
      })
    }
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  selectTestmonialTab(index: number) {
    this.activeTestmonialsTab = index;
  }

}
