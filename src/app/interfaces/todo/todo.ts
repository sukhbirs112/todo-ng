import { ServerResponse } from '../../interfaces/server-response/server-response';

export interface TodoUser{
    username: string;
}


export interface TodoItemUserInputToAdd {
    title: string
    description: string,
    complete: boolean
}

export interface TodoItemUserInputToUpdate extends TodoItemUserInputToAdd {
    id: number
}


export interface TodoItem extends TodoItemUserInputToAdd {
    id: number,
    datecreated: Date
}



export interface TodoUserSR extends TodoUser, ServerResponse {

}


// Data to get back from server after adding a user;
export interface TodoAddUserSR extends ServerResponse {
    id: number
    datecreated: Date
}

// Todo Item Server Response
export interface TodoItemSR extends TodoItem, ServerResponse
{

}

