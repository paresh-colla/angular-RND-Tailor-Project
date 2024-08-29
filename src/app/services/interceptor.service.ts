import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { CommonService } from './common.service';
import { CookieService } from 'ngx-cookie-service';

export const InterceptorService: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const commonServices = inject(CommonService);
  const cookieServices = inject(CookieService);
  const authToken = commonServices.getToken();

  if(authToken){

    const localStorageToken: any = localStorage.getItem('authToken');
    const cookiesCheck: any = cookieServices.check('token');
    if(!cookiesCheck){
      let expirationDateTime = new Date();
      expirationDateTime.setMinutes(expirationDateTime.getMinutes() + 2);
      cookieServices.set('token', localStorageToken, expirationDateTime);
      const expired = new Date(new Date().getTime() + (2 * 60 * 1000 ));
      cookieServices.set('expireTime', 'true', expired)
    }

    const authReq = request.clone({
      url: request.url,
      setHeaders: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }
  return next(request);
};
