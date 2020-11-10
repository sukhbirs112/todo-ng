import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IntroComponent } from './intro/intro.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule } from '@angular/forms';
import { FlashbarComponent } from './flashbar/flashbar.component';

import { httpInterceptorProviders } from './http-interceptor/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IntroComponent,
    SignupComponent,
    FlashbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
