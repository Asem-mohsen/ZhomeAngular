import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import UAParser from 'ua-parser-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  errorMsg: string = '';
  isLoading : boolean = false ;

  constructor(private _AuthService: AuthService, private _router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    device_name: new FormControl(null, [Validators.required]),
    operating_system: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    const parser = new UAParser();
    const result = parser.getResult();

    // Patch the form values
    this.loginForm.patchValue({
      device_name: this.getDeviceName(result),
      operating_system: this.getOS(result),
    });

  }


  getDeviceName(result: UAParser.IResult): string {
    return result.device.vendor ? `${result.device.vendor} ${result.device.model}` : 'Unknown Device';
  }

  getOS(result: UAParser.IResult): string {
    return result.os.name ? `${result.os.name} ${result.os.version}` : 'Unknown OS';
  }

  loginSubmit()
  {
    this.isLoading = true
    if (this.loginForm.valid) {

      this._AuthService.sendLogin(this.loginForm.value).subscribe({

        next: (res) => {
          this.isLoading = false

          // set the token on local storage
          const token = res.data.token;
          localStorage.setItem('userToken', token);

          //Navigatation
          if (res.data.admin) {
            this._AuthService.currentUserDate.next(res.data.admin);
            localStorage.setItem('currentUserData', JSON.stringify(res.data.admin));
            this._router.navigate(['admin/dashboard']);
          } else {
            this._AuthService.currentUserDate.next(res.data.user);
            localStorage.setItem('currentUserData', JSON.stringify(res.data.user));
            this._router.navigate(['home']);
          }

        },
        error: (err) => {
          this.isLoading = false
          this.errorMsg = err.error.message || 'An error occurred during registration';
        }
      });
    } else {
      this.errorMsg = 'Please fill all required fields correctly';
    }

  }


}