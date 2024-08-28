import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from "../../additions/product-card/product-card.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { profileResponse, User } from '../../../Interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CarouselModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user!: User;
  errorMessage: string = '';
  orderStatistics !: {};
  private loggedInUserId: number | null = null;

  constructor(private _AuthService : AuthService , private toastr: ToastrService){}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/profile')
    }
    this.getLoggedInUserId();
    this.loadProfile();
  }


  getLoggedInUserId() {

  }

  loadProfile() {
    if (this.loggedInUserId === null) {
      this.errorMessage = 'No user is currently logged in.';
      return;
    }

    this._AuthService.userProfile(this.loggedInUserId).subscribe({
      next: (res) => {
        this.user = res.data.user;
        this.orderStatistics = res.data.orderStatistics;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.errorMessage = 'An error occurred while fetching the profile.';
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


