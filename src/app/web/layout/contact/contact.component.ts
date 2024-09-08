import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Contact } from '../../../Interfaces/contact';
import { ContactService } from '../../../Services/contact/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  zhomeContact !: Contact
  
  constructor(private contactService : ContactService){}
  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/contact')
    }

    this.contactService.getZhomeData().subscribe({
      next : (res) => {
        this.zhomeContact = res.data
      }
    })
  }
}
