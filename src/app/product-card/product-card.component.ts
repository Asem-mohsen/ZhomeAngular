import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ProductsService } from '../Services/products/products.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink , NgFor , NgIf , CurrencyPipe, TitleCasePipe ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {



  @Input() product!: Product;
  constructor(private _ProductService : ProductsService){

  }

  ngOnInit(): void {
    if (!this.product) {
      this._ProductService.getProduct().subscribe((products) => {
        this.product = products.data[0];
      });
    }
  }

  addToCart() {
    console.log('Adding to cart:', this.product);
  }

}
