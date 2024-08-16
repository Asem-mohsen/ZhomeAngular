import { Admin } from './../../interface/admin';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  admins: Admin[] = [];

  constructor(private _AdminService: AdminService) { }

  ngOnInit(): void
  {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/admin')
    }
    this._AdminService.getAdmins().subscribe((res) => {
      this.admins = Object.values(res.data.admins);
    })
  }
}
