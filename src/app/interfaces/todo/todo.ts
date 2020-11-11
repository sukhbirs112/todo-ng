import { ServerResponse } from '../../interfaces/server-response/server-response';

export interface TodoUser{
    username: string;
}

export interface TodoItem {
    title: string
    description: string
}

export interface TodoList {
    TodoItems: TodoItem[]
}

export interface TodoUserSR extends TodoUser, ServerResponse {

}

// Todo Item Server Response
export interface TodoItemSR extends TodoItem, ServerResponse
{

}

export interface TodoListSR extends TodoList, ServerResponse
{

}