# Todoapp

A simple web application for creating a user account and creating todo items.
The application is meant to be used with the webserver in the repo 'todo-node' and a postgresql database.

# Notes
The web application has a feature which shows an animated message to the user (see the floating-flashbar component). The message details the latest action to be performed on a todo item.
For example, "<Title of Todo Item> was Successfully Saved/Deleted". This was one of the more challenging and fun components to develop from scratch as it
required the development of a queue which would store several actions in order of completetion which would be shown one by one to the user.
 
 
