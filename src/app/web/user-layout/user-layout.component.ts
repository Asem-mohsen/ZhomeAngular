import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../additions/navbar/navbar.component';
import { FooterComponent } from '../additions/footer/footer.component';
import { NgIf } from '@angular/common';
import { PageService } from '../../Services/Settings/Pages/page.service';
import { ViewportScroller } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [NgIf , NgxSpinnerModule , RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent implements OnInit {
  title = 'Zhome';

  constructor(private router: Router , private _AuthService : AuthService) {}

    ngOnInit(): void {

      this._AuthService.getSessionId();

    }



    isAuthPage(): boolean {
      const authRoutes = ['/login', '/register' , '/forgetPassword']; // navbar/footer should not appear
      return authRoutes.includes(this.router.url);
    }
}
