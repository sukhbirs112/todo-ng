import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  
  apiUrlPrefix:string = 'http://localhost:8080/api';

  loginUrl:string = 'http://localhost:8080/login';

  csrfUrl:string = 'http://localhost:8080/api/csrf'

  constructor() { 
  }
}
