import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../Services/products/products.service';
import { Product, ProductImages } from '../../../Interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgStyle } from '@angular/common';
import { ProductCardComponent } from "../../additions/product-card/product-card.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CarouselModule, NgStyle, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products: Product[] = []; 
  productID: string | null = ''; 
  product: Product | null = null; 
  productImages: ProductImages[] = [];
  productPlatforms: any[] = [];

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
  constructor(private _ProductService : ProductsService , private _ActivatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((res) => {
      this.productID = res.get('productId');
      if (this.productID) {
        this.loadProductDetails(this.productID);
      }
    });

  }

  loadProductDetails(productID: string): void {
    this._ProductService.getOneProduct(productID).subscribe((res) => {
      this.products = res.data['Recommended-Products'];
      this.product = res.data.Product;
      this.productImages = res.data.Product.images;
      this.productPlatforms = res.data.Product.platforms;
    });
  }

  getTechnologyString(): string {
    if (!this.product || !this.product.technologies) return '';

    return this.product.technologies
      .map(technology => technology.Technology)
      .join(' - ');
  }
}
