import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { OrdersService } from './../../../Services/orders/orders.service';
import { Component , Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CheckoutData } from '../../../Interfaces/checkout';
import { AuthService } from '../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentsService } from '../../../Services/payments/payments.service';

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

  constructor(private _ordersService : OrdersService , private _authService : AuthService , private _toaster : ToastrService , private paymentService : PaymentsService , private _router : Router){}

  // steps
  step : number = 1;

  userInfo: FormGroup = new FormGroup({
    CartID: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    Address: new FormControl(null, [Validators.required]),
    Phone: new FormControl(null, [Validators.required]),
    Name: new FormControl(null, [Validators.required , Validators.minLength(3)]),
    UserShippingAddress: new FormControl(null, [Validators.required]),
    Country: new FormControl(null, [Validators.required]),
    City: new FormControl(null, [Validators.required]),
    Building: new FormControl(null, [Validators.required]),
    Floor: new FormControl(null, [Validators.required]),
    Apartment: new FormControl(null, [Validators.required]),
  });

  checkPromocodeForm: FormGroup = new FormGroup({
    promoCode: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/checkout')
    }

    this._ordersService.checkoutOrders().subscribe({
      next : (res) =>{
        this.orderData = res.data;
        this.total.set(res.data.total);
      },
    })

    this.isLogged = this._authService.isAuthenticated();
    if (this.isLogged) {
      this.loadUserDetails();
    }
    
  }


  // fetch  user details
  loadUserDetails() {
    this._ordersService.checkoutOrders().subscribe({
      next: (res) => {
        this.userInfo.patchValue({
          CartID: this.orderData.CartID,
          email: res.data.User.email,
          Address: res.data.User.Address,
          Phone: res.data.User.Phone,
          Name: res.data.User.Name,
        });
      }
    });
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
    const promoCodeValue = this.checkPromocodeForm.get('promoCode')?.value;

    this._ordersService.checkPromocode(promoCodeValue, this.total()).subscribe({
      next: (res) => {
        this.total.set(res.data.total);
        this.savedAmount.set(res.data.savedAmount || 0);
        this.step = 4;
      },
    });
  }


  cashPay()
  {
    this.paymentService.createCashPayment(this.userInfo.value.CartID , this.total()).subscribe({
      next : (res) => {
        if (res.success == true) {
          this._router.navigate(['/cart']);
          this._toaster.success('Track your order');
        }
      }
    });
  }

  cardPay()
  {
    this.paymentService.createPayment(this.total(), this.userInfo.value.CartID).subscribe({
      next : (response) => {
        if (response.success) {
          window.location.href = response.url;
        } else {
          console.error('Failed to create checkout session:', response.error);
        }
      }
    });
  }

}
