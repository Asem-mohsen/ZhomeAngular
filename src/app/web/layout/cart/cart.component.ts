import { AuthService } from './../../../Services/auth/auth.service';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ProductCardComponent } from '../../additions/product-card/product-card.component';
import { CartService } from '../../../Services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse, CartItem } from "../../../Interfaces/cart";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../Interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink , CarouselModule , ProductCardComponent , CurrencyPipe, TitleCasePipe , FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent{

  isLogged : boolean = false ;
  // cartData!: CartData;
  cartItems: CartItem[] = [];
  products: Product[] = [];

  total: number = 0;
  count!: number
  constructor(private _cartService : CartService  , private _AuthService : AuthService , private toastr: ToastrService){}

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
    nav: true
  };

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/cart')
    }

    if(this._AuthService.getCurrentUser() != null) {
      this.isLogged = true
    }

    this.loadCartItems();
  }

  loadCartItems(): void {
    this._cartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response.data.cartItems;
        this.total = response.data.total;
        this.count = response.data.count;
        this.products = response.data.products;
      },
      error: (err) => {
        console.error('Error loading cart items:', err);
      },
    });
  }

  removeProduct(id : number)
  {
    this._cartService.removeItem(id).subscribe({
      next : (res) => {
        this.toastr.success(res.message);
        this.loadCartItems();
      },
      error : (err) =>{
        this.toastr.error('an error occured');
      }
    })
  }

  clearCart()
  {
    this._cartService.removeAll().subscribe({
      next : (res) => {
        this.toastr.success(res.message);
        this.loadCartItems();
      },
      error : (err) =>{
        this.toastr.error('an error occured');
      }
    })
  }

  // Spinner Quantity
  incrementQuantity(item: CartItem) {
    if (item.Quantity < item.product.Quantity) {
      item.Quantity++;
      this._cartService.updateQuantity(item.product.ID, item.Quantity).subscribe((res)=>{
        this.loadCartItems();
      })
    }
  }

  decrementQuantity(item: CartItem) {
    if (item.Quantity > 1) {
      item.Quantity--;
      this._cartService.updateQuantity(item.product.ID, item.Quantity).subscribe((res)=>{
        this.loadCartItems();
      })
    }
  }

}
