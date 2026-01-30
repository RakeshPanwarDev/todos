import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {

  
 todos = signal<{text:string,done:boolean}[]>(
 []);

 newTodo=signal<{text:string,done:boolean}>({text:"",done:false});

 saveTodo(todo:{text:string,done:boolean}){
  //this.todos.set(])
  this.todos.update(current => [...current, this.newTodo()]);
  this.newTodo.set({text:"",done:false});
 }
 toggleTodo(index: number) {
  this.todos.update(list =>
    list.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    )
  );
}


 removeTodo(index: number) {
  console.log(index);
  this.todos.update(list =>
    list.filter((_, i) => i !== index)
  );
  console.log(this.todos());
  
}

}
