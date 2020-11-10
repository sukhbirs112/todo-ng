import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { CsrfService } from '../services/csrf/csrf.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor(private csrf: CsrfService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    let excludeCsrf: boolean = request && request.body && request.body.excludeCsrf;
    if (request.method == 'GET' || excludeCsrf) {
      return next.handle(request.clone({ setHeaders: { 'X-Requested-With': 'XMLHttpRequest' } }));
    }
    else if (request.method == 'POST') {
      let csrfToken: string = this.csrf.getCSRF();
      console.log(`intercept ${csrfToken}`);
      const csrfInRequest = request.clone({ setHeaders: { 'csrf-token': csrfToken, 'X-Requested-With': 'XMLHttpRequest' } });
      return next.handle(csrfInRequest);
    }

  }
}
