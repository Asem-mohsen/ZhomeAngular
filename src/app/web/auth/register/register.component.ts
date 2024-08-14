import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import UAParser from 'ua-parser-js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './../login/login.component.css'
})
export class RegisterComponent implements OnInit{

  errorMsg: string = '';
  isLoading : boolean = false ;
  registerForm: FormGroup;

  constructor(private _AuthService: AuthService , private _router : Router) {
    const parser = new UAParser();
    const result = parser.getResult();

    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      device_name: new FormControl(this.getDeviceName(result), [Validators.required]),
      operating_system: new FormControl(this.getOS(result), [Validators.required]),
    });
  }


  ngOnInit(): void {}
  

  getDeviceName(result: UAParser.IResult): string {
    return result.device.vendor ? `${result.device.vendor} ${result.device.model}` : 'Unknown Device';
  }

  getOS(result: UAParser.IResult): string {
    return result.os.name ? `${result.os.name} ${result.os.version}` : 'Unknown OS';
  }


  registerSubmit()
  {
    if (this.registerForm.valid) {
      this._AuthService.sendRegister(this.registerForm.value).subscribe({
        next: (res) => {          
          //LOGIN
          this._router.navigate(['login'])
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.message || 'An error occurred during registration';
        }
      });
    } else {
      this.errorMsg = 'Please fill all required fields correctly';
    }
    
  }


}
