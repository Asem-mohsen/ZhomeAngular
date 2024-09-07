import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Component , OnDestroy , Input, OnInit} from '@angular/core';
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
  imports: [RouterLink,  CommonModule , CarouselModule , ProductCardComponent , TranslateModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit, OnDestroy{

  categories : Category[] = []
  shopData !: any ;
  productsOnSale: Product[] = [];
  bundle!: Product;
  category1 !:Category;
  category2 !: Category;
  brand !: Brand ;

  activeTab: string = 'Recommended';

  countdownInterval: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  // Sliders
  ProductsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplayTimeout: 5000,
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
    nav: false,
  };

  CategorySlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout: 5000,
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
  }

  BrandsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout: 5000,
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
  }

  ShopSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplayTimeout: 5000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        loop: false
      },
      400: {
        items: 1,
        loop: true
      },
      740: {
        items: 1,
        loop: true
      },
      940: {
        items: 1,
        loop: true
      }
    },
    nav: true,
  }

  constructor(private _ShopService : ShopService){}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/shop')
    }

    this._ShopService.getShopPage().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.shopData = res.data;
          this.productsOnSale = res.data.All_Products_On_Sale || [];
          this.bundle = res.data.Bundle_to_Show as Product || null;
          this.category1 = res.data.Category1_to_show?.Category as Category || null;
          this.category2 = res.data.Category2_to_show?.Category as Category || null;
          this.brand = res.data.Brand_to_show?.Brand as Brand || null;
          if (this.shopData?.Promocode?.EndsIn) {
            this.startCountdown(this.shopData.Promocode.EndsIn);
          }
        }
      },
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }


  startCountdown(endDate: string): void {
    const endDateTime = new Date(endDate).getTime();

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const timeDiff = endDateTime - now;

      if (timeDiff < 0) {
        clearInterval(this.countdownInterval);
        this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      } else {
        this.timeLeft = this.calculateTimeLeft(timeDiff);
      }
    }, 1000);
  }

  calculateTimeLeft(timeDiff: number) : { days: number; hours: number; minutes: number; seconds: number }
  {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
