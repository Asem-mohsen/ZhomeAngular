import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationService } from '../../../Services/translation/translation.service';
import { ServiceService } from '../../../Services/services-offered/service.service';
import { Services } from '../../../Interfaces/services';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule , TranslateModule , CurrencyPipe],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

  currentLang : string = 'en'
  services : Services[] = []
  constructor(private translationService : TranslationService , private _services : ServiceService){}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/services')
    }

    this.currentLang = this.translationService.getLanguage();

    this._services.getServices().subscribe({
      next : (res) => {
        this.services = res.data.services
      }
    })
  }


}
