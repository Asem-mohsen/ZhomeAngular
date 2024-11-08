import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../../../../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../../../../Interfaces/user';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink ,TranslateModule ,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: '../../profile.component.css'
})
export class EditComponent {


  userInfo: FormGroup = new FormGroup({
    Name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.email]),
    Address: new FormControl(null, [Validators.required]),
    Phone: new FormControl(null, [Validators.required]),
    Password: new FormControl(null, [Validators.minLength(8)]),
  });

  constructor(private _AuthService : AuthService , private toastr: ToastrService , private router : Router){}

  user !: User

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/profile/edit')
    }

    this._AuthService.getUserProfile().subscribe({
      next : (res)=>{
        this.user = res.data.user;
        this.userInfo.patchValue({ // patch value is used to set the data on the form
          email: this.user.email,
          Address: this.user.address?.street_address,
          Phone: this.user.phones,
          Name: this.user.name,
        });
      }
    })
  }


  updateUserInfo(){
    this._AuthService.updateUserProfile(this.userInfo.value).subscribe({
      next : (res)=>{

        this.toastr.success('Your Profile Updated Successfully')

        this.router.navigate(['/profile']);

      }
    })
  }
}
