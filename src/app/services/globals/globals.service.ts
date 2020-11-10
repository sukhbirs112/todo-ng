import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {


  host: string;

  apiUrlPrefix: string;

  loginUrl: string;

  csrfUrl: string;

  appUrl: string;

  constructor() {
    let host = 'http://localhost:8080';
    this.host = host;
    this.loginUrl = host + '/login';
    this.appUrl = host + '/todo';

    this.apiUrlPrefix = host + '/api';
    this.csrfUrl = this.apiUrlPrefix + '/csrf';

  }
}
