import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  isLoggedIn: boolean = false;
  constructor(private _AuthService : AuthService){}

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
}
