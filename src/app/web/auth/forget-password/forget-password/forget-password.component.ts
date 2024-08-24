import { Component } from '@angular/core';
import { AuthService } from '../../../../Services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  step : number = 1

  constructor(private _AuthService : AuthService){}

  ngOnInit(): void {
    
    
  }
}
