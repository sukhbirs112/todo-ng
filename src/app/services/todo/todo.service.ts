import { Injectable } from '@angular/core';

import { ServerResponse } from '../../interfaces/server-response/server-response';
import { TodoUser, TodoItemUserInputToAdd, TodoItemUserInputToUpdate, TodoItem } from '../../interfaces/todo/todo'
import { GlobalsService } from '../globals/globals.service';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
    public globals: GlobalsService
  ) { }

  todoItems: TodoItem[] = [];

  loadTodoItems(cb: (res: any) => void): void {
    this.http.get<any>(`${this.globals.todoItemsUrl}/get`).subscribe((res: any) => {
      if (res.success) {
        this.todoItems = res.todoItems;
      } else {
        this.todoItems = null;
      }
      cb(res);
    });
  }



  getTodoItems(): TodoItem[] {
    // returns clone of TodoItems
    return this.todoItems.map((tI)=>{
      return this.cloneTodoItem(tI);
    });
  }

  cloneTodoItem(todoItem: TodoItem): TodoItem {
    return {
      id: todoItem.id,
      title: todoItem.title,
      description: todoItem.description,
      datecreated: todoItem.datecreated,
      complete: todoItem.complete
    }
  }

  addTodoItem(todoItem: TodoItem, cb: (res: any) => void): void {
    console.log('Service addTodoItem');
    const postData: TodoItemUserInputToAdd = {
      title: todoItem.title,
      description: todoItem.description,
      complete: todoItem.complete
    };
    this.http.post<any>(`${this.globals.todoItemsUrl}/add`, postData).subscribe((res: any) => {
      if (res.success) {
        const newTodoItem = {
          id: res.id,
          title: todoItem.title,
          description: todoItem.description,
          complete: todoItem.complete,
          datecreated: res.datecreated
        };
        this.todoItems.splice(0, 0, newTodoItem);
      }
      cb(res);
    });
  }


  updateTodoItem(todoItem: TodoItem, cb: (res: any) => void): void {
    console.log('Service updateTodoItem');
    const postData: TodoItemUserInputToUpdate = {
      id: todoItem.id,
      title: todoItem.title,
      description: todoItem.description,
      complete: todoItem.complete
    };
    this.http.post<any>(`${this.globals.todoItemsUrl}/update`, postData).subscribe((res: any) => {
      if (res.success) {
        const itemToUpdate = this.todoItems.find((item) => { return item.id === todoItem.id });
        itemToUpdate.title = todoItem.title;
        itemToUpdate.description = todoItem.description;
        itemToUpdate.complete = todoItem.complete;
      }
      cb(res);
    });
  }

}
