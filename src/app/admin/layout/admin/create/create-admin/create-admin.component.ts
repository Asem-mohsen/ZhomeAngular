import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule , Validators , FormControl} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RolesService } from '../../../../services/roles/roles.service';
import { Role } from '../../../../interface/admin';
import { AuthService } from '../../../../../Services/auth/auth.service';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.css'
})
export class CreateAdminComponent {

  errorMsg: string = '';
  isLoading : boolean = false ;
  roles : Role[] = [];

  currentAdmin: any;
  adminName: string = '';
  adminRole: string = '';

  constructor(private _router: Router , private _AuthService: AuthService , private _AdminService: AdminService) { }

  addAdminForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    device_name: new FormControl(null, [Validators.required]),
    operating_system: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.currentAdmin = this._AuthService.getCurrentUser();
      if (this.currentAdmin && this.currentAdmin.admin) {
        this.adminName = this.currentAdmin.admin.Name;
        this.adminRole = this.currentAdmin.admin.Role;
      }

    this._AdminService.getCreate().subscribe((res) => {
      this.roles = Object.values(res.data.Roles);
    })
    
  }
  storeAdmin()
  {
    this._AdminService.store(this.addAdminForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        this._router.navigate(['/admin/admins'])
      },

      error: (err) => {
        this.isLoading = false
        this.errorMsg = err.error.message || 'An error occurred during registration';
      }
    })
  }
}
