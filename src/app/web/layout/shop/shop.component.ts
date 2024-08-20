import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../../Services/categories/categories.service';
import { Category } from '../../../Interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrandService } from '../../../Services/brands/brand.service';
import { Brand } from '../../../Interfaces/brand';
import { ShopService } from '../../../Services/Pages/Shop/shop.service';
import { Product } from '../../../Interfaces/product';
import { ProductCardComponent } from '../../additions/product-card/product-card.component';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink,  CarouselModule , ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  categories : Category[] = []
  shopData: any; 
  bundle!: Product;
  category1 !:Category;
  category2 !: Category;
  brand !: Brand ;
  // Sliders
  ProductsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        loop: false
      },
      400: {
        items: 2,
        loop: true
      },
      740: {
        items: 2,
        loop: true
      },
      940: {
        items: 4,
        loop: true
      }
    },
    nav: false
  };

  CategorySlider: OwlOptions = {
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

  CategoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 900,
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
    nav: true
  }

  constructor(
    private _ShopService : ShopService
  ){}

  ngOnInit(): void {
    this._ShopService.getShopPage().subscribe((res) => {
      this.shopData = res.data; 
      this.bundle = this.shopData['Bundle to Show'] as Product;
      this.category1 = this.shopData['Category 1 to show'].Category as Category;
      this.category2 = this.shopData['Category 2 to show'].Category as Category;
      this.brand = this.shopData['Brand to show'].Brand as Brand;
  
    });
  }

}
