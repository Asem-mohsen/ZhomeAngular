import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../Services/products/products.service';
import { Product, ProductImages } from '../../../Interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgStyle, CurrencyPipe, TitleCasePipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductCardComponent } from "../../additions/product-card/product-card.component";
import { CartService } from '../../../Services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../Services/translation/translation.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CarouselModule, NgStyle, ProductCardComponent , CurrencyPipe , TitleCasePipe , FormsModule , CommonModule , TranslateModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products: Product[] = [];
  productID !: string | null;
  product !: Product ;
  productImages: ProductImages[] = [];
  productPlatforms: any[] = [];
  isAdded : boolean = false;
  activeTab : string = '';
  currentLang : string = 'en'
  collapseStates: { [key: string]: boolean } = {
    'description': true,
    'faq': true,
    'video':true
  };

  // Sliders
  ProductsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplayTimeout:5000,
    navSpeed: 700,
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

  FeaturesSlider:OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  ImagesSlider:OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
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
        items: 2
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private _ProductService : ProductsService , private _ActivatedRoute : ActivatedRoute , private _cartService : CartService , private toastr: ToastrService , private _titleService: Title, private translationService : TranslationService, @Inject(PLATFORM_ID) private platformId: Object){}
  // ActivatedRoute => to extract any param form the url

  ngOnInit(): void {

    this.currentLang = this.translationService.getLanguage();

    if (isPlatformBrowser(this.platformId)) {
      this._ActivatedRoute.paramMap.subscribe((res) => {
        this.productID = res.get('productId');

        this._ProductService.getOneProduct(this.productID).subscribe({


          next: (res) => {
            this.products = res.data['Recommended-Products'];
            this.product = res.data.Product;
            this.productImages = res.data.Product.images;
            this.productPlatforms = res.data.Product.platforms;

            if (this.product?.Name) {
              this._titleService.setTitle(this.product.Name);
            }

          }
        });

        if (typeof localStorage != 'undefined') {
          localStorage.setItem('currentPage', `/product/${this.productID}`)
        }

      });
    }

  }

  quantity: number = 1;

  addToCart(id: number, quantity?: number): void {
    this._cartService.storeCart(id, quantity).subscribe({
      next : (res) => {
        this.isAdded = true;
        this.toastr.success('product Added Successfully');
        setTimeout(() => {
          this.isAdded = false;
        }, 5000);
      },
      error: (err)=>{
        this.isAdded = false;
      }
    })
  }

  getTechnologyString(): string {
    if (!this.product || !this.product.technologies) return '';

    return this.product.technologies
      .map(technology => technology.Technology)
      .join(' - ');
  }

  incrementQuantity() {
    if (this.quantity < this.product.Quantity) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  toggleCollapse(section: string) {
    this.collapseStates[section] = !this.collapseStates[section]; // Toggle the collapse state for the specified section
  }
}
