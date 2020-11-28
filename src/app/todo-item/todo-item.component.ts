import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TodoItem } from '../interfaces/todo/todo';

import { TodoService } from '../services/todo/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {


  @Input()
  get todoItem(): TodoItem {
    return this._todoItem;
  };
  set todoItem(todoItem: TodoItem) {
    this._todoItem = todoItem;
    this._formTodoItem = this.todo.cloneTodoItem(todoItem);
  }



  private _todoItem: TodoItem;

  get formTodoItem(): TodoItem {
    return this._formTodoItem;
  }
  private _formTodoItem: TodoItem;

  constructor(private todo: TodoService) { }

  // Edit Mode
  private _editMode: boolean = false;


  @Input()
  get editMode(): boolean { return this._editMode }
  set editMode(value: boolean) {
    this._editMode = value;
    if (value) {
      this.enterEditMode();
    }
    else {
      this.exitEditMode();
    }
  }

  @Output() saveClicked = new EventEmitter<TodoItem>();
  @Output() cancelClicked = new EventEmitter<number>();
  @Output() deleteClicked = new EventEmitter<number>();

  ngOnInit(): void {
  }

  onDeleteOrSave(event: Event): void {
    // perform operation based on state of editMode
    if (this.editMode) {
      // Validate form
      if (! this._formTodoItem.title) {
        return ;
      }
      // Save Item
      this.exitEditMode();
      this.saveClicked.emit(this._formTodoItem);
    }
    else {
      // Delete Item
      this.deleteClicked.emit(this._formTodoItem.id);
    }

  }

  onEditOrCancel(): void {
    // perform operation based on state of editMode
    if (this.editMode) {
      this.exitEditMode();
      this.cancelClicked.emit(this._todoItem.id);
      if (this.todoItem.id === null) {
      }
      else {
        this._formTodoItem = this.todo.cloneTodoItem(this._todoItem);
      }
    }
    else {
      // Start Edit Mode
      this.enterEditMode();
    }

  }

  enterEditMode(): void {
    this._editMode = true;

  }

  exitEditMode(): void {
    this._editMode = false;
  }

}
