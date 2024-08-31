import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  defaultLang = 'en';

  constructor(private _translateService : TranslateService , @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this._translateService.setDefaultLang(this.defaultLang);

      this._translateService.use(this.defaultLang);

      this.changeDirection(this.defaultLang);
    }

  }


  changeLang(lang : string)
  {
    this._translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }

  changeDirection(lang : string)
  {
    if (lang === 'en') {
      document.dir = 'ltr'
    }else if(lang === 'ar'){
      document.dir = 'rtl'
    }
  }

}
