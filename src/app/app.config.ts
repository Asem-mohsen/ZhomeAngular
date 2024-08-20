import { ApplicationConfig , importProvidersFrom} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptors/authInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule ,RouterModule , BrowserAnimationsModule , CarouselModule),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
