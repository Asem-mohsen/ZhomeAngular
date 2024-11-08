import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Category } from '../../../Interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../Services/categories/categories.service';
import { RouterLink } from '@angular/router';
import { NgStyle, isPlatformBrowser } from '@angular/common';
import { ProductCardComponent } from '../../additions/product-card/product-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../Services/translation/translation.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink , CarouselModule , NgStyle , ProductCardComponent , TranslateModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  currentLang : string = 'en'

  categories: Category[] = [];

  // Sliders
  ProductsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed:5000,
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

  constructor(private translationService : TranslationService , private _CategoriesService : CategoriesService,  @Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void
  {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/categories')
    }

    this.currentLang = this.translationService.getLanguage();

    if(isPlatformBrowser(this.platformId)){
      this._CategoriesService.getCategories().subscribe((res) => {
        this.categories = res.data.categories;
      })
    }
  }

}
