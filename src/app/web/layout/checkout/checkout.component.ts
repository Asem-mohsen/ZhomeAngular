import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { OrdersService } from './../../../Services/orders/orders.service';
import { Component , Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CheckoutData } from '../../../Interfaces/checkout';
import { AuthService } from '../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink , CurrencyPipe , ReactiveFormsModule , CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  stripe: Stripe | null = null;
  orderData !: CheckoutData ;
  isLogged : boolean = false

  // Signals for the total and saved amount
  total = signal<number>(0);
  savedAmount = signal<number>(0);

  constructor(private _ordersService : OrdersService , private _authService : AuthService , private _toaster : ToastrService){}

  // steps
  step : number = 1;

  userInfo: FormGroup = new FormGroup({
    CartID: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    Address: new FormControl(null, [Validators.required]),
    Phone: new FormControl(null, [Validators.required]),
    Name: new FormControl(null, [Validators.required]),
    UserShippingAddress: new FormControl(null, [Validators.required]),
    Country: new FormControl(null, [Validators.required]),
    City: new FormControl(null, [Validators.required]),
    Building: new FormControl(null, [Validators.required]),
    Floor: new FormControl(null, [Validators.required]),
    Apartment: new FormControl(null, [Validators.required]),
  });

  checkPromocodeForm: FormGroup = new FormGroup({
    promocode: new FormControl(null),
  });

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/checkout')
    }

    this._ordersService.checkoutOrders().subscribe({
      next : (res) =>{
        this.orderData = res.data;
        this.userInfo.patchValue({ CartID: this.orderData.CartID });
      },
    })

    this.isLogged = this._authService.isAuthenticated();
  }

  submitUserInfo()
  {
    this._ordersService.saveUserInfo(this.userInfo.value).subscribe({
      next : (res)=>{
        this._toaster.success('Saved Successfully');
        this.step = 3;
      }
    })
  }


  next() {
    this.step += 1;
  }

  back()
  {
    this.step -= 1
  }

  checkPromocode() {
    this._ordersService.checkPromocode(this.checkPromocodeForm.value, this.total()).subscribe({
      next: (res) => {
        this.total.set(res.data.total); // Update total signal
        this.savedAmount.set(res.data.savedAmount || 0); // Set the saved amount signal
        this.step = 4;
      },
    });
  }


  cashPay()
  {

  }

  cardPay()
  {

  }
}
