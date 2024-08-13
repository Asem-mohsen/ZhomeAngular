import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './../login/login.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup = new FormGroup({
      // null is the default value
      name:             new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(50)]), 
      email:            new FormControl(null , [Validators.required , Validators.email]),
      password:         new FormControl(null , [Validators.required , Validators.minLength(8) ]),
      // device_name:      new FormControl(null , [Validators.required]),
      // operating_system: new FormControl(null , [Validators.required]),
    }
  )

  registerSubmit()
  {
    console.log(this.registerForm.value) 
  }
}
