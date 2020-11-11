import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../services/globals/globals.service';
import { CsrfService } from '../services/csrf/csrf.service';

import { Observable } from 'rxjs';
import { TodoUser, TodoItem, TodoList, TodoUserSR, TodoItemSR, TodoListSR } from '../interfaces/todo/todo'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private http: HttpClient,
    public globals: GlobalsService,
    private csrf: CsrfService) { }

  username: string;

  ngOnInit(): void {
    this.csrf.loadCSRF();
    this.setUsername();
  }

  setUsername(): void {
    if (!this.username) {
      this.loadUserData().subscribe((res: TodoUserSR) => {
        if (res.success) {
          this.username = res.username;
        }
        else {
          this.username = '';
        }
      });
    }
  }

  loadUserData(): Observable<TodoUserSR> {
    return this.http.get<TodoUserSR>(`${this.globals.apiUrl}/user`);
  }


}
