import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../Services/translation/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink , TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  isLoggedIn: boolean = false;
  currentLang: string = 'en'

  constructor(private _AuthService : AuthService , private translationService : TranslationService){}

  ngOnInit(): void {

    this.isLoggedIn = this._AuthService.isAuthenticated();

  }

  switchLang(lang: string): void {
    this.translationService.changeLang(lang);
    this.translationService.changeDirection(lang);
    this.currentLang = lang;
  }
}
