import { AuthService } from './../../../Services/auth/auth.service';
import { Component , signal, computed , ChangeDetectorRef} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ProductCardComponent } from '../../additions/product-card/product-card.component';
import { CartService } from '../../../Services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse, CartItem } from "../../../Interfaces/cart";
import { FormsModule } from '@angular/forms';
import { Product } from '../../../Interfaces/product';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsService } from '../../../Services/products/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink , CarouselModule , ProductCardComponent , CurrencyPipe, TitleCasePipe , FormsModule , TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent{

  isLogged : boolean = false ;

  cartItems = signal<CartItem[]>([]);
  products : Product [] = [];

  total = signal(0);

  installationPrices = signal<{ [key: number]: number }>({});

  totalSaved = signal(0);

  count = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + Number(item.quantity), 0);
  });

  countOfProducts = computed(() => this.cartItems().length);

  subtotal = computed(() => {
    return this.cartItems().reduce((acc, item) => {
      const itemTotal = Number(item.quantity) * Number(item.price);
      const installationPrice = Number(this.installationPrices()[item.product.id] || 0);
      return acc + itemTotal + installationPrice;
    }, 0);
  });

  constructor(private _cartService : CartService  , private _AuthService : AuthService , private toastr: ToastrService , private _router : Router , private _products : ProductsService){}

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
        items: 1,
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

    this.isLogged = this._AuthService.isAuthenticated();

    this.loadCartItems();

    this.loadProducts();
  }


  loadCartItems(): void {
    this._cartService.getCart().subscribe({
      next: (response: ApiResponse) => {
        this.cartItems.set(response.items);
        this.total.set(response.total_amount);
        this.totalSaved.set(response.total_saved);
      }
    });
  }

  loadProducts():void
  {
    this._products.getProductsCard().subscribe({
      next: (response) => {
        this.products = response.data.products;
      }
    })
  }

  removeProduct(id : number)
  {
    this._cartService.removeItem(id).subscribe({
      next : (res) => {
        this.toastr.success(res.message);
        this.loadCartItems();
      }
    })
  }

  clearCart()
  {
    this._cartService.removeAll().subscribe({
      next : (res) => {
        this.toastr.success(res.message);
        this.loadCartItems();
      }
    })
  }

  checkout()
  {
    this._cartService.checkout().subscribe({
      next : (res) => {
        this._router.navigate(['/checkout']);
      }
    })
  }

  toggleInstallation(item: CartItem, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    const currentPrices = { ...this.installationPrices() };
    if (isChecked) {
      currentPrices[item.product.id] = Number(item.product.installation_cost) || 0;
    } else {
      delete currentPrices[item.product.id];
    }
    this.installationPrices.set(currentPrices);
    this.updateTotal();
  }

  updateTotal(): void {
    const newTotal = this.subtotal();
    this.total.set(newTotal);
  }

  calculateFullTotal(): number {
    const cartTotal = this.subtotal();
    return cartTotal;
  }

  // Spinner Quantity
  incrementQuantity(item: CartItem) {
    if (item.quantity < item.product.quantity) {
      item.quantity++;
      this._cartService.updateQuantity(item.product.id, item.quantity).subscribe({
        next: (res) => {
          this.loadCartItems();
        }
      });
    }
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this._cartService.updateQuantity(item.product.id, item.quantity).subscribe({
        next: (res) => {
          this.loadCartItems();
        }
      });
    }
  }

}
