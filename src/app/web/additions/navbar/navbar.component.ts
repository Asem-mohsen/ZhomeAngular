import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements  OnInit {

  isLoggedIn: boolean = false;

  constructor(private _AuthService: AuthService , private _router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this._AuthService.isAuthenticated();
    // this._AuthService.currentUserDate.subscribe(() => {

    //   if (this._AuthService.currentUserDate.getValue() == null)
    //   {
    //     this.isLoggedIn = false
    //   } else {
    //     this.isLoggedIn = true
    //   }

    // })

  }

  logout() {
    this._AuthService.signOutAllSessions()
  }
}
