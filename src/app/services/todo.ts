import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TodoItem } from '../todo/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http=inject(HttpClient);
  baseUrl = 'http://localhost:3000/todos';

  getTodos() {
    return this.http.get<TodoItem[]>(this.baseUrl);
  }
  addTodo(todo: TodoItem) {
    return this.http.post<TodoItem>(this.baseUrl, todo);
  }
  updateTodo(id: string, todo: {text:string,done:boolean}) {
    return this.http.put<{text:string,done:boolean}>(`${this.baseUrl}/${id}`, todo);
  }
  deleteTodo(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
