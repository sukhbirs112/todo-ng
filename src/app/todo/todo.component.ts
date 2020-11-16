import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../services/globals/globals.service';
import { CsrfService } from '../services/csrf/csrf.service';
import { TodoService } from '../services/todo/todo.service';


import { Observable } from 'rxjs';
import { TodoUser, TodoItem } from '../interfaces/todo/todo'
//import { ServerResponse } from '../interfaces/server-response/server-response';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private http: HttpClient,
    public globals: GlobalsService,
    private csrf: CsrfService,
    public todo: TodoService
  ) { }

  username: string;

  todoItems: TodoItem[] = [];

  // used for adding a new TodoItem
  newTodoItem: TodoItem;

  public addingNewTodoItem: boolean = false;

  ngOnInit(): void {
    this.csrf.loadCSRF();
    this.setUsername();
    this.loadTodoItems();
    this.resetNewTodoItem();
  }

  setUsername(): void {
    if (!this.username) {
      this.loadUserData().subscribe((res: any) => {
        if (res.success) {
          this.username = res.username;
        }
        else {
          this.username = '';
        }
      });
    }
  }

  resetNewTodoItem(): void {
    this.newTodoItem = {
      id: null,
      datecreated: null,
      title: '',
      description: '',
      complete: false
    }
  }


  loadUserData(): Observable<TodoUser> {
    return this.http.get<TodoUser>(`${this.globals.apiUrl}/user`);

  }

  loadTodoItems(): void {
    this.todo.loadTodoItems((res: any) => {
      this.todoItems = this.todo.getTodoItems();
      console.log(res);
      console.log(this.todoItems);
    });
  }

  // Handle click event for add new todo item button
  addTodoItem(): void {
    console.log('Add todo item');
    this.addingNewTodoItem = true;
  }


  // This event is triggered by child todo-item component save click.
  onSave(event: TodoItem): void {

    console.log(event);

    if (event.id === null) {
      // add new todo item
      this.todo.addTodoItem(event, (res: any) => {
        console.log(res);
        if (res.success) {
          this.addingNewTodoItem = false;
          // reset new todo item
          this.resetNewTodoItem();
        }
      });
    }
    else {
      this.todo.updateTodoItem(event, (res: any) => {
        if (res.success) {
          console.log('Updated');
        }
      });
    }
  }

  onCancel(event: number): void {
    
    if (event === null) {
      this.addingNewTodoItem = false;
      this.resetNewTodoItem();
    }
  }

}
