import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from "../../additions/product-card/product-card.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { profileResponse, User } from '../../../Interfaces/user';
import { Product } from '../../../Interfaces/product';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CarouselModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user!: User;
  orderStatistics !: {};
  products !: Product[]


  constructor(private _AuthService : AuthService , private toastr: ToastrService){}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/profile')
    }
    this.loadProfile();
  }

  loadProfile() {
    this._AuthService.getUserProfile().subscribe({
      next: (res) => {
        this.orderStatistics = res.data;
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


}


