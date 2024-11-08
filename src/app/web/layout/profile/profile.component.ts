import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ProductCardComponent } from "../../additions/product-card/product-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../Interfaces/user';
import { Product } from '../../../Interfaces/product';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CarouselModule , TranslateModule , RouterModule , NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user!: User;
  products !: Product[]
  activeTab : string = 'settings'

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
    nav: false,
  };

  constructor(private _AuthService : AuthService , private toastr: ToastrService , private router : Router, @Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {

    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/profile')
    }

    if (isPlatformBrowser(this.platformId)) {

      this.loadProfile();

    }
  }

  loadProfile() {
    this._AuthService.getUserProfile().subscribe({
      next: (res) => {
          this.user = res.data.user;
          this.products = res.data.products;
      }
    });
  }

  formatOrderDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  deactivate()
  {
    this._AuthService.deactivateUserProfile().subscribe({
      next: (res) => {
        this.toastr.success(res.message);

        this._AuthService.signOutAllSessions();

        this.router.navigate(['/login']);
      }
    })
  }

  delete()
  {
    this._AuthService.deleteUserProfile().subscribe({
      next: (res) => {
        this.toastr.success(res.message);

        this._AuthService.signOutAllSessions();

        this.router.navigate(['/login']);
      }
    })
  }

  selectTab(tab : string)
  {
    this.activeTab = tab
  }

}


