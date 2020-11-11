import { Component, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';


import { GlobalsService } from '../services/globals/globals.service';
import { CsrfService } from '../services/csrf/csrf.service';
import { ServerResponse } from '../interfaces/server-response/server-response';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    username: '',
    password: '',
  };

  // message is an input to a Flashbar.
  message: string;

  constructor(
    private http: HttpClient,
    public globals: GlobalsService,
    private csrf: CsrfService
  ) {

  }



  ngOnInit(): void {
    this.csrf.loadCSRF();
  }

  submitLoginForm(): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.globals.apiUrl}/login`, this.credentials);
  }

  onButtonClick() {
    console.log('On Submit');
    console.log(`${this.credentials.username} ${this.credentials.password}`);
    this.submitLoginForm().subscribe((res: ServerResponse) => {
      console.log(res);
      if (res.success) {
        // Redirect to app home
        console.log('success');
        this.message = `Logging In.`;
       window.location.href = this.globals.appUrl;
      }
      else {
        // modify flash bar
        console.log('failure');
        this.message = res.msg;
      }
    });
  }

}
