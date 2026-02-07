import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo';


export interface TodoItem {
  id?: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {


  todos = signal<TodoItem[]>(
    []);

  newTodo = signal<TodoItem>({ text: "", done: false });

  todoService = inject(TodoService);

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      console.log(data);
      this.todos.set(data);
    });
  }

  saveTodo(todo: { text: string, done: boolean }) {
    this.todoService.addTodo(todo).subscribe(savedTodo => {
      this.todos.update(current => [...current, savedTodo]);
      this.newTodo.set({ text: "", done: false });
    });
  }
  toggleTodo(index: number) {
    this.todos.update(list =>
      list.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  }


  removeTodo(index: number) {
    this.todoService.deleteTodo(index).subscribe({
      next: () => {
        this.loadTodos();
      }
    });
  }

}
