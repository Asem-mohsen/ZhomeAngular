import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../Services/translation/translation.service';
import { ContactService } from '../../../Services/contact/contact.service';
import { Contact } from '../../../Interfaces/contact';
import { NgIf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink , TranslateModule , NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  isLoggedIn: boolean = false;
  currentLang: string = 'en';

  zhomeContact !: Contact ;


  constructor(private _AuthService : AuthService , private translationService : TranslationService, private contactService : ContactService , @Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {

    this.isLoggedIn = this._AuthService.isAuthenticated();

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

  switchLang(lang: string): void {
    this.translationService.changeLang(lang);
    this.translationService.changeDirection(lang);
    this.currentLang = lang;
  }
}
