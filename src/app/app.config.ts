import { ApplicationConfig , importProvidersFrom} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptors/authInterceptor';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule , provideToastr } from 'ngx-toastr';
import { SwiperModule } from 'ngx-swiper-wrapper';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(HttpClientModule ,RouterModule , BrowserAnimationsModule , CarouselModule , ToastrModule , SwiperModule),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
