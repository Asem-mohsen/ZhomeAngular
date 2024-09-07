import { Component } from '@angular/core';
import { AuthService } from '../../../../Services/auth/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgetPasswordService } from '../../../../Services/auth/forget-password/forget-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css' , '../../login/login.component.css']
})
export class ForgetPasswordComponent {

  step : number = 1

  errorMsg: string = '';

  isLoading : boolean = false ;

  show: boolean = false;

  constructor(private toaster : ToastrService, private _router: Router , private _ForgetPasswordService : ForgetPasswordService) { }

  ForgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCodeForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  ResetForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/forgetPassword')
    }
  }

  verifySubmit()
  {
    this._ForgetPasswordService.sendVerificationCode(this.ForgetPasswordForm.value.email).subscribe({
      next : (res)=>{
        this.toaster.success('Code Sent Successfully, Please check your email');
        this.step = 2;
      }
    })
  }

  verifyCode()
  {
    this._ForgetPasswordService.verifyCode(this.ForgetPasswordForm.value.email , this.verifyCodeForm.value).subscribe({
      next : (res)=>{
        this.toaster.success('Code Verified Successfully');
        this.step = 3;
      }
    })
  }

  SubmitReset()
  {

    this._ForgetPasswordService.resetPassword(this.ForgetPasswordForm.value.email , this.verifyCodeForm.value.code , this.ResetForm.value.password ).subscribe({
      next: (res) => {
        this.toaster.success('Password reset successfully');
        this.isLoading = true
        this._router.navigate(['/login']);

      }
    });

  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordsDoNotMatch: true };
    }

    return null;
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.show = !this.show;
    passwordInput.type = this.show ? 'text' : 'password';
  }
}
