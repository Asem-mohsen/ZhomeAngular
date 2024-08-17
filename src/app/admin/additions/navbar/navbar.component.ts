import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls:['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn: boolean = false;
  
  constructor(private _AuthService  : AuthService){}

  ngOnInit(): void {

    this._AuthService.currentUserDate.subscribe(() => {

      if (this._AuthService.currentUserDate.getValue() == null)
      {
        this.isLoggedIn = false
      } else {
        this.isLoggedIn = true
      }

    })

  }

  logout() {
    this._AuthService.signOutAllSessions()
  }
}
