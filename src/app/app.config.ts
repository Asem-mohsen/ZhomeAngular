import { ApplicationConfig , importProvidersFrom} from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors ,withFetch, HttpClient } from '@angular/common/http';
import { authInterceptor } from './Interceptors/authInterceptor.interceptor';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule , provideToastr } from 'ngx-toastr';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { errorInterceptor } from './Interceptors/errorInterceptor/error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { spinnerLoadingInterceptor } from './Interceptors/spinner-loading/spinner-loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes  , withInMemoryScrolling({
    scrollPositionRestoration: 'top'
  })),
    provideClientHydration(),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(HttpClientModule ,
      RouterModule ,
      BrowserAnimationsModule , CarouselModule , ToastrModule , SwiperModule , NgxSpinnerModule ,
      TranslateModule.forRoot({
      defaultLanguage : 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    provideHttpClient(withFetch() ,withInterceptors([authInterceptor , errorInterceptor , spinnerLoadingInterceptor]))
  ]
};
