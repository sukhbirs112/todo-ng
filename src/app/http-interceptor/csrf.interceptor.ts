import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Csrf } from '../interfaces/csrf/csrf'
import { CsrfService } from '../services/csrf/csrf.service';



@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor(private csrf: CsrfService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    if (request.method == 'GET') {
      return next.handle(request);
    }
    else if (request.method == 'POST') {
      let csrfToken: string = this.csrf.getCSRF();
      console.log(`intercept ${csrfToken}`);
      const csrfInRequest = request.clone({ headers: request.headers.set('csrf-token', csrfToken) })
      return next.handle(csrfInRequest);
    }

  }
}
