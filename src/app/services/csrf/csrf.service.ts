import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Csrf } from '../../interfaces/csrf/csrf';
import { GlobalsService } from '../globals/globals.service';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(
    private http: HttpClient,
    public globals: GlobalsService
  ) { }


  csrfToken: string;

  loadCSRF(): void {
    this.http.get<Csrf>(this.globals.csrfUrl).subscribe((resp: Csrf) => {
      this.csrfToken = resp.csrf;
    });
  }

  getCSRF(): string {
    // for an object obj, set the csrf property
    return this.csrfToken;
  }

}
