import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../Services/products/products.service';
import { Product, ProductImages } from '../../../Interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgStyle } from '@angular/common';
import { ProductCardComponent } from "../../additions/product-card/product-card.component";
import { CartService } from '../../../Services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CarouselModule, NgStyle, ProductCardComponent],
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
  constructor(private _ProductService : ProductsService , private _ActivatedRoute : ActivatedRoute , private _cartService : CartService , private toastr: ToastrService){}
  // ActivatedRoute => to extract any param form the url

  ngOnInit(): void {

    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', `/product/${this.productID}`)
    }

    this._ActivatedRoute.paramMap.subscribe((res) => {
      this.productID = res.get('productId');
      this._ProductService.getOneProduct(this.productID).subscribe({

        next: (res) => {
          this.products = res.data['Recommended-Products'];
          this.product = res.data.Product;
          this.productImages = res.data.Product.images;
          this.productPlatforms = res.data.Product.platforms;
        },
        error:(err) =>{
          console.error('Error retrieving product:', err);
        }
      });


    });

  }

  addToCart(id : number) : void {
    this._cartService.storeCart(id).subscribe({
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


}
