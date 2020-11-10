import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IntroComponent } from './intro/intro.component';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
	{ path: 'todo', component: TodoComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: '' , component: IntroComponent }		
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
