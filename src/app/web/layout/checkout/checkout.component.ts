import { Order, UserData } from './../../../Interfaces/checkout';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule, CurrencyPipe, NgFor , isPlatformBrowser } from '@angular/common';
import { OrdersService } from './../../../Services/orders/orders.service';
import { Component , Inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CheckoutData } from '../../../Interfaces/checkout';
import { AuthService } from '../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentsService } from '../../../Services/payments/payments.service';
import { TranslateModule } from '@ngx-translate/core';
import { CountriesCitiesService } from '../../../Services/countries-cities/countries-cities.service';
import { UserInfoFormComponent } from '../../additions/components/user-info-form/user-info-form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink , CurrencyPipe , ReactiveFormsModule , CommonModule, TranslateModule ,NgFor , UserInfoFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  orderData !: CheckoutData ;
  orders !: Order[] ;
  isLogged : boolean = false

  countries: { name: string; flag: string; code: string }[] = [];
  cities: { name: string }[] = [];
  selectedCountry: string = '';
  isCitySelectDisabled: boolean = true;

  // Signals for the total and saved amount
  total = signal<number>(0);
  savedAmount = signal<number>(0);

  constructor(@Inject(PLATFORM_ID) private platformId: Object , private _ordersService : OrdersService , private _authService : AuthService , private _toaster : ToastrService , private paymentService : PaymentsService , private _router : Router, private countryCitiesService: CountriesCitiesService){}

  // steps
  step : number = 1;

  userInfo: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    street_address: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required , Validators.minLength(3)]),
    firstName: new FormControl(null, [Validators.required , Validators.minLength(3)]),
    country: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    building: new FormControl(null, [Validators.required]),
    floor: new FormControl(null, [Validators.required]),
    apartment: new FormControl(null, [Validators.required]),
  });

  checkPromocodeForm: FormGroup = new FormGroup({
    promotion: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/checkout')
    }

    if (isPlatformBrowser(this.platformId)) {

      this.loadCheckoutAndUserDetails();

      this.loadCountries();

      this.isLogged = this._authService.isAuthenticated();
    }
  }

  loadCheckoutAndUserDetails() {
    this._ordersService.checkoutOrders().subscribe({
      next: (res) => {
        this.orders = res.data.orders;
        this.total.set(res.data.total);

        const phones = Array.isArray(res.data.user.phones) ? res.data.user.phones : [res.data.user.phones];

        // Split name into first and last names
        const fullName = res.data.user.name || '';
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0] || ''; // The first part as first name
        const lastName = nameParts.slice(1).join(' ') || '';

        this.userInfo.patchValue({
          email: res.data.user.email,
          address: res.data.user.address?.street_address,
          phone: phones[0] || '',
          name: fullName,
          firstName: firstName,
          lastName: lastName,
          building: res.data.user.address?.building ,
          floor: res.data.user.address?.floor,
          apartment: res.data.user.address?.apartment ,
        });
      }
    });
  }


  submitUserInfo()
  {
    const userInfoData: UserData = {
      ...this.userInfo.value,
      phone: [this.userInfo.value.phone]
    };

    this._ordersService.saveUserInfo(userInfoData).subscribe({
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
    const promotion = this.checkPromocodeForm.get('promotion')?.value;

    this._ordersService.checkPromocode(promotion, this.total()).subscribe({
      next: (res) => {
        this.total.set(res.data.total);
        this.savedAmount.set(res.data.savedAmount || 0);
        this.step = 4;
      },
    });
  }

  loadCountries(): void {
    this.countryCitiesService.getCountries().subscribe({
      next: (data) => {
        this.countries = data.map((country: any) => ({
          name: country.name.common,
          flag: country.flags.png,
          code: country.cca2
        }));
      },
      error: (error) => console.error('Error fetching countries:', error)
    });
  }

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (!value) {
      return;
    }

    this.selectedCountry = value;
    this.isCitySelectDisabled = false;

    this.countryCitiesService.getCities(value).subscribe({
      next: (data) => {
        this.cities = data.data;
      },
      error: (error) => console.error('Error fetching cities:', error)
    });

  }


  cashPay()
  {
    this.paymentService.createCashPayment(this.total()).subscribe({
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
    this.paymentService.createPayment(this.total()).subscribe({
      next : (response) => {
          console.log(this.total());
          window.location.href = response.payment_link;
      }
    });
  }

}
