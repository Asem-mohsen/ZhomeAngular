import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css' ]
})
export class SidebarComponent {

 subMenuStates: { [key: string]: boolean } = {};
  currentAdmin: any;
  adminName: string = '';

  constructor(private _AuthService: AuthService) { }

  ngOnInit(): void {
    this.currentAdmin = this._AuthService.getCurrentUser();
    if (this.currentAdmin && this.currentAdmin.admin) {
      this.adminName = this.currentAdmin.admin.Name;
    }
  }


  toggleSubMenu(menu: string) {
    this.subMenuStates[menu] = !this.subMenuStates[menu];
  }

  isSubMenuOpen(menu: string): boolean {
    return this.subMenuStates[menu];
  }

}
