import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GlobalsService } from '../services/globals/globals.service';
import { CsrfService } from '../services/csrf/csrf.service';
import { ServerResponse as ServerResponse} from '../interfaces/server-response/server-response';

import { Observable } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


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
  ) { }

  ngOnInit(): void {
    //this.http.get('http://localhost:8080/api/').subscribe((res) => { console.log(res); });
    this.csrf.loadCSRF();
  }

  submitSignupForm(): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.globals.apiUrl}/signup`, this.credentials);
  }

  onButtonClick(): void {
    console.log('On Submit');
    console.log(`${this.credentials.username} ${this.credentials.password}`);
    this.submitSignupForm().subscribe((res: ServerResponse) => {
      console.log(res);
      if (res.success) {
        // Redirect to login page
        console.log('success');
        this.message = `Your account was successfully created. 
          You will be directed to the login page shortly. 
          If you are not directed there automatically, you may click the button below.`;
        window.location.href = this.globals.loginUrl;
      }
      else {
        // modify flash bar
        console.log('failure');
        this.message = res.msg;
      }
    });
  }


}
