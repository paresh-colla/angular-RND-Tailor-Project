import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { CommonService } from './services/common.service';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,), provideHttpClient(withInterceptors([InterceptorService])),provideAnimationsAsync(), provideClientHydration(), CommonService]
};
