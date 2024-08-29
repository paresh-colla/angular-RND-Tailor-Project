import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public tokenRefreshInterval: any;

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) { }


  getAPI(apiUrl: string, requestObj?:{}): Observable<any>{
    return this.http.get(apiUrl,{observe: 'response'}).pipe(
      catchError(this.handleError)
    );
  }

  postAPI(apiUrl: string, requestObj?: {}): Observable<any>{
    return this.http.post(apiUrl,requestObj,{observe: 'response'}).pipe(
      catchError(this.handleError)
    );
  }

  patchAPI(apiUrl: string, requestObj?: {}): Observable<any>{
    return this.http.patch(apiUrl, requestObj, {observe: 'response'}).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse){
    console.error('An error occurred:', error.message);
    return throwError(()=> new Error(error?.message))
  }

  isTokenValid(): any{
    if(localStorage.length == 0){
      return false;
    }else{
      return this.scheduleTokenRefresh();
    }
  }


  scheduleTokenRefresh(): any{
    const getExpiredTime: any = this.cookiesService.check('expireTime');
    if(!getExpiredTime){
      console.log("Reset Token !");
      this.cookiesService.delete('expireTime');
      localStorage.removeItem('authToken');
      return false;
    }else{
      return true;
    }
  }

  getToken(): any{
    if(localStorage.length > 0){
      return localStorage.getItem('authToken');
    }
  }
}
