import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import UAParser from 'ua-parser-js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './../login/login.component.css'
})
export class RegisterComponent implements OnInit{

  errorMsg: string = '';
  isLoading: boolean = false;
  show: boolean = false;


  constructor(private _AuthService: AuthService, private _router: Router) { }

    registerForm: FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      device_name: new FormControl(null, [Validators.required]),
      operating_system: new FormControl(null, [Validators.required]),
    });

  ngOnInit(): void {
    const parser = new UAParser();
    const result = parser.getResult();

    // Patch the form values
    this.registerForm.patchValue({
      device_name: this.getDeviceName(result),
      operating_system: this.getOS(result),
    });

    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/register')
    }

  }


  getDeviceName(result: UAParser.IResult): string {
    return result.device.vendor ? `${result.device.vendor} ${result.device.model}` : 'Unknown Device';
  }

  getOS(result: UAParser.IResult): string {
    return result.os.name ? `${result.os.name} ${result.os.version}` : 'Unknown OS';
  }


  registerSubmit()
  {
    this.isLoading = true
    if (this.registerForm.valid) {
      this._AuthService.sendRegister(this.registerForm.value).subscribe({
        next: (res) => {

          this._AuthService.saveToken(res.data.user.token);

          this.isLoading = false

          this._router.navigate(['home']);
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


  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.show = !this.show;
    passwordInput.type = this.show ? 'text' : 'password';
  }

}
