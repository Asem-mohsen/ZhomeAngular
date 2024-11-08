import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../Interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ProductsService } from '../../../Services/products/products.service';
import { CartService } from '../../../Services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink , NgFor , NgIf , CurrencyPipe, TitleCasePipe , CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;
  isAdded: boolean = false;

  constructor(private _cartService : CartService , private toastr: ToastrService){

  }

  ngOnInit(): void {
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
        this.toastr.error('Error Adding a product');
        console.log(err)
      }
    })
  }

}
