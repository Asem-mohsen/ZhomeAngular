import { Component } from '@angular/core';
import { Category } from '../../../Interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../Services/categories/categories.service';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { ProductCardComponent } from '../../additions/product-card/product-card.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink , CarouselModule , NgStyle , ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {


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

  constructor(private _CategoriesService : CategoriesService){}

  ngOnInit(): void
  {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/categories')
    }

    this._CategoriesService.getCategories().subscribe((res) => {
      this.categories = Object.values(res.data);
    })
  }

}
