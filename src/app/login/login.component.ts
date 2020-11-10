import { Component, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GlobalsService } from '../services/globals/globals.service';
import { FormValidationResponse } from '../interfaces/httpresponse/formvalidationresponse';

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
    public globals: GlobalsService
  ) { }



  ngOnInit(): void {
  }

  onButtonClick() {}

}
