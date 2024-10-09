import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Contact } from '../../../Interfaces/contact';
import { ContactService } from '../../../Services/contact/contact.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  zhomeContact !: Contact

  constructor(private contactService : ContactService, @Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/contact')
    }

    if (isPlatformBrowser(this.platformId)) {
      this.contactService.getZhomeData().subscribe({
        next : (res) => {
          this.zhomeContact = res.data
        },
        error: (err) => {
          console.error("Failed to load contact data", err);
        }
      })
    }
  }
}
